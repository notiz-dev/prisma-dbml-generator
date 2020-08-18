import {
  generatorHandler,
  GeneratorOptions,
  DMMF,
} from '@prisma/generator-helper';
import { promises } from 'fs';
import { join } from 'path';

const { mkdir, writeFile } = promises;

generatorHandler({
  onManifest() {
    return {
      defaultOutput: './dbml',
      prettyName: 'Prisma DBML Generator',
    };
  },
  async onGenerate(options: GeneratorOptions) {
    console.log('DBML generator', options.dmmf.datamodel);
    if (options.generator.output) {
      try {
        await mkdir(options.generator.output, { recursive: true });

        const dbml = generateTables(options.dmmf.datamodel.models);

        await writeFile(join(options.generator.output, 'schema.dbml'), dbml);
      } catch (e) {
        console.error('Error: unable to write files for Prisma DBML Generator');
        throw e;
      }
    } else {
      throw new Error('No output was specified for Prisma DBML Generator');
    }
  },
});

const generateTables = (models: DMMF.Model[]): string => {
  return models
    .map(
      (model) => `Table ${model.name} {
    ${generateFields(model.fields)}
  }`
    )
    .join(`\n`);
};

const generateFields = (fields: DMMF.Field[]): string => {
  return fields.map((field) => `${field.name} ${field.type}`).join('\n');
};

const generateEnum = (models: DMMF.Model[]): string => {
  return '';
};
