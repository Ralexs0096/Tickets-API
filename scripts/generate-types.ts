import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import fs from 'fs';
import path from 'path';

const schemasFolder = path.join(__dirname, '../src/schemas');
const outDir = path.join(__dirname, '../src/types');

function getAllJsonFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).map((f) => {
    return path.join(dir, f.name);
  });
}

(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const jsonFiles = getAllJsonFiles(schemasFolder);

  for (const file of jsonFiles) {
    const dereferenced = await $RefParser.dereference(file);
    const ts = await compile(
      dereferenced as any,
      path.basename(file, '.json'),
      {
        bannerComment: '',
      }
    );

    fs.writeFileSync(
      path.join(outDir, path.basename(file, '.json') + '.d.ts'),
      ts
    );
    console.log(`✅ Generated types for ${file}`);
  }
})();
