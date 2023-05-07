import { GeneratorOptions } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/internals';
import { promises } from 'fs';
import { join } from 'path';
import { generateDBMLSchema } from '../generator/dbml';
import { getProjectOptions } from '../generator/project';

const { access, mkdir, writeFile } = promises;

export const defaultDBMLFileName = 'schema.dbml';

export async function generate(options: GeneratorOptions) {
  const { output, config } = options.generator;
  const outputDir = parseEnvValue(output!);
  const dbmlFileName = config.outputName || defaultDBMLFileName;
  const allowManyToMany = config.manyToMany === 'false' ? false : true;
  const mapToDbSchema = config.mapToDbSchema === 'false' ? false : true;
  const includeRelationFields =
    config.includeRelationFields === 'false' ? false : true;
  const throwOnFailure = config.throwOnFailure === 'false' ? false : true;
  const projectOptions = await getProjectOptions(config);

  try {
   await access(outputDir);
  } catch (e) {
    if (throwOnFailure) {
      throw new Error(`Warning: output directory ${outputDir} cannot be accessed.`);
    }

    console.warn(`Warning: output directory ${outputDir} cannot be accessed.`);
    process.exit(0);
  }

  try {
    await mkdir(outputDir, { recursive: true });

    // for debugging dmmf schema
    // await writeFile('./test.json', JSON.stringify(options.dmmf.datamodel));

    const dbmlSchema = generateDBMLSchema(
      options.dmmf,
      allowManyToMany,
      mapToDbSchema,
      includeRelationFields,
      projectOptions
    );

    await writeFile(join(outputDir, dbmlFileName), dbmlSchema);
  } catch (e) {
    if (throwOnFailure) {
      console.error('Error: unable to write files for Prisma DBML Generator');
      throw e;
    }

    console.warn('Warning: unable to write files for Prisma DBML Generator');
  }
}
