import {
  FastifyInstance,
  FastifyBaseLogger,
  FastifyPluginAsync,
} from 'fastify';
import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';

const isRunningUnderTest = typeof jest !== 'undefined';

interface NormalizeOpenApiSchemasPluginOpts {
  schemaDir?: string;
  routePrefix?: string;
}

interface JsonSchema {
  $id?: string;
  title?: string;
  [key: string]: unknown;
}

const normalizeOpenApiSchemasPlugin: FastifyPluginAsync<NormalizeOpenApiSchemasPluginOpts> =
  fp(async (fastify, opts) => {
    addSchemaRoutes(fastify, opts);

    fastify.addHook('onReady', async () => {
      process.nextTick(() => {
        rewriteDefinitionsToMatchTitle(fastify);
      });

      fastify.setSerializerCompiler(({ httpStatus }) => {
        return function serializer(data: any) {
          if (httpStatus && +httpStatus >= 400 && !data?.code) {
            data.code = 'UNKNOWN_ERROR';
          }
          return JSON.stringify(data);
        };
      });
    });
  }, '^5');

function addSchemaRoutes(
  fastify: FastifyInstance,
  {
    schemaDir = 'schemas',
    routePrefix = '/documentation',
  }: NormalizeOpenApiSchemasPluginOpts = {}
): void {
  const filenames = fs.readdirSync(schemaDir);

  for (const filename of filenames) {
    const fullPath = path.join(schemaDir, filename);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const schema = JSON.parse(raw) as JsonSchema;

    schema.$id = filename;
    fastify.addSchema(schema);

    if (isRunningUnderTest) continue;

    const handler = () => schema;
    const base = path.basename(filename, '.json');

    const routes = new Set([
      `${routePrefix}/${filename}`,
      `${routePrefix}/${base}`,
      `/${filename}/`,
      `/${base}/`,
    ]);

    for (const route of routes) {
      fastify.get(route, { schema: { hide: true } }, handler);
    }
  }
}

function rewriteDefinitionsToMatchTitle(fastify: FastifyInstance): void {
  const spec = fastify.swagger() as Record<string, unknown>;
  rewriteSpecRefs(spec, fastify.log);
}

function rewriteSpecRefs(
  spec: Record<string, unknown>,
  log: FastifyBaseLogger
): void {
  const components = spec.components as Record<string, unknown> | undefined;
  const schemas = components?.schemas as Record<string, unknown> | undefined;
  const definitions = spec.definitions as Record<string, unknown> | undefined;

  const defs = schemas ?? definitions;
  const defsPath = schemas ? 'components/schemas' : 'definitions';

  if (!defs) {
    log.debug({ msg: 'no definitions/schemas found' });
    return;
  }

  const renameMap: Record<string, string> = {};

  for (const [key, rawDef] of Object.entries(defs)) {
    if (!/^def-\d+$/.test(key)) continue;
    if (!rawDef || typeof rawDef !== 'object') continue;

    const def = rawDef as JsonSchema;
    if (!def.title || typeof def.title !== 'string') continue;

    renameMap[key] = def.title;
    (defs as Record<string, unknown>)[def.title] = def;
  }

  walkObject(spec, (node, path) => {
    if (node.$ref && typeof node.$ref === 'string') {
      node.$ref = rewriteRef(node.$ref, renameMap, defsPath);
    }

    if (
      node.title &&
      typeof node.title === 'string' &&
      !path.startsWith(defsPath)
    ) {
      const title = node.title;
      if ((defs as Record<string, unknown>)[title]) {
        for (const k of Object.keys(node)) delete node[k];
        node.$ref = `#/${defsPath}/${title}`;
      }
    }
  });

  for (const oldKey of Object.keys(renameMap)) {
    delete (defs as Record<string, unknown>)[oldKey];
  }
}

function rewriteRef(
  ref: string,
  renameMap: Record<string, string>,
  defsPath: string
): string {
  const jsonMatch = ref.match(/([^/]+)\.json/);
  if (jsonMatch && jsonMatch[1]) {
    return `#/${defsPath}/${jsonMatch[1]}`;
  }

  const defMatch = ref.match(
    /^#\/(definitions|components\/schemas)\/(def-\d+)$/
  );

  if (defMatch && defMatch[2]) {
    const defKey = defMatch[2];
    const newName = renameMap[defKey];
    if (newName) {
      return `#/${defsPath}/${newName}`;
    }
  }

  return ref;
}

function walkObject(
  value: any,
  visitor: (node: any, path: string) => void,
  path = ''
): void {
  if (!value || typeof value !== 'object') return;

  visitor(value, path);

  if (Array.isArray(value)) {
    value.forEach((v, i) => walkObject(v, visitor, `${path}[${i}]`));
  } else {
    for (const [k, v] of Object.entries(value)) {
      walkObject(v, visitor, path ? `${path}/${k}` : k);
    }
  }
}

export default normalizeOpenApiSchemasPlugin;
