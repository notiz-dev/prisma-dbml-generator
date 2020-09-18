import { GeneratorOptions } from '@prisma/generator-helper';
import { generateDBMLSchema } from '../generator/dbml';
import { promises } from 'fs';
import { join } from 'path';

const { mkdir, writeFile } = promises;

export const defaultDBMLFileName = 'schema.dbml';

export async function generate(options: GeneratorOptions) {
  const outputDir = options.generator.output!;
  const dbmlFileName =
    options.generator.config.outputName || defaultDBMLFileName;

  try {
    await mkdir(outputDir, { recursive: true });

    // await writeFile('./test.json', JSON.stringify(options.dmmf.datamodel));

    const dbmlSchema = generateDBMLSchema(options.dmmf);

    await writeFile(join(outputDir, dbmlFileName), dbmlSchema);
  } catch (e) {
    console.error('Error: unable to write files for Prisma DBML Generator');
    throw e;
  }
}
