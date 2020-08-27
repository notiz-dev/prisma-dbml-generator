import { GeneratorOptions } from '@prisma/generator-helper';
import { generateDBMLSchema } from '../generator/dbml';
import { promises } from 'fs';
import { join } from 'path';

const { mkdir, writeFile } = promises;

export async function generate(options: GeneratorOptions) {
  if (options.generator.output) {
    try {
      await mkdir(options.generator.output, { recursive: true });

      // await writeFile('./test.json', JSON.stringify(options.dmmf.datamodel));

      const dbmlSchema = generateDBMLSchema(options.dmmf);

      await writeFile(
        join(options.generator.output, 'schema.dbml'),
        dbmlSchema
      );
    } catch (e) {
      console.error('Error: unable to write files for Prisma DBML Generator');
      throw e;
    }
  } else {
    throw new Error('No output was specified for Prisma DBML Generator');
  }
}
