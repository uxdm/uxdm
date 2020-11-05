import { resolve } from 'path';
import { outputFile } from 'fs-extra';

import {
  PartialArgs,
  getProgramFromFiles,
  buildGenerator,
} from 'typescript-json-schema';

import { compilerOptions } from '../tsconfig.build.json';

// optionally pass argument to schema generator
const settings: PartialArgs = {
  required: true,
  uniqueNames: true,
};

const program = getProgramFromFiles(
  [resolve(__dirname, '../src/index.ts')],
  compilerOptions,
);

const generator = buildGenerator(program, settings);

const names = generator.getMainFileSymbols(program);

const task = names.map(async (symbolName) => {
  const schema = generator.getSchemaForSymbol(symbolName);

  const filename = `${symbolName.split('.')[0]}.schema.json`;
  const filepath = resolve(__dirname, `../schema/${filename}`);
  outputFile(filepath, JSON.stringify(schema, null, 2), () => {
    console.log(`已生成:${filename}`);
  });
});

Promise.all(task);
