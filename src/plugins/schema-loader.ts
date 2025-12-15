import { FastifyInstance } from 'fastify';
import fs from 'fs';
import path from 'path';

export function schemaLoader(
  fastify: FastifyInstance,
  opts: { folder: string }
) {
  const folderPath = path.resolve(opts.folder);
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.json'));

  for (const file of files) {
    const schemaPath = path.join(folderPath, file);
    const raw = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(raw);

    // if there is not #id, use the file name
    if (!schema.$id) {
      schema.$id = path.basename(file, '.json');
    }

    fastify.addSchema(schema);
  }
}
