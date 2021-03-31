import { GeneratorOptions } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/sdk';
import { promises } from 'fs';
import { join } from 'path';
import { generateDBMLSchema } from '../generator/dbml';

const { mkdir, writeFile } = promises;

export const defaultDBMLFileName = 'schema.dbml';

export async function generate(options: GeneratorOptions) {
  const outputDir =
    // This ensures previous version of prisma are still supported
    typeof options.generator.output === 'string'
      ? //@ts-ignore
        (options.generator.output! as string)
      : parseEnvValue(options.generator.output!);
  const dbmlFileName =
    options.generator.config.outputName || defaultDBMLFileName;
  const allowManyToMany =
    options.generator.config.manyToMany === 'false' ? false : true;

  try {
    await mkdir(outputDir, { recursive: true });

    // await writeFile('./test.json', JSON.stringify(options.dmmf.datamodel));

    const dbmlSchema = generateDBMLSchema(options.dmmf, allowManyToMany);

    await writeFile(join(outputDir, dbmlFileName), dbmlSchema);
  } catch (e) {
    console.error('Error: unable to write files for Prisma DBML Generator');
    throw e;
  }
}
