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

        const tables = generateTables(options.dmmf.datamodel.models);
        const enums = generateEnums(options.dmmf.datamodel.enums);
        const refs = generateRefs(options.dmmf.datamodel.models);

        const dbml = [...tables, ...enums, ...refs].join('\n\n');

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

const generateTables = (models: DMMF.Model[]): string[] => {
  return models.map(
    (model) => `Table ${model.name} {
    ${generateFields(model.fields)}
  }`
  );
};

const generateFields = (fields: DMMF.Field[]): string => {
  return fields.map((field) => `${field.name} ${field.type}`).join('\n');
};

const generateEnums = (enums: DMMF.DatamodelEnum[]): string[] => {
  return enums.map(
    (e) => `Enum ${e.name} {
        ${generateEnumValues(e.values)}
  }`
  );
};

const generateEnumValues = (values: DMMF.EnumValue[]): string => {
  return values.map((value) => `${value.name}`).join('\n');
};

const generateRefs = (models: DMMF.Model[]): string[] => {
  const refs: string[] = [];
  models.forEach((model) => {
    model.fields
      .filter(
        (field) =>
          field.relationName &&
          field.relationToFields?.length &&
          (field as any).relationFromFields.length
      )
      .forEach((field) => {
        const relatedTables = field.relationName!!.split('To');
        refs.push(
          `Ref: ${relatedTables[0]}.${
            (field as any).relationFromFields[0]
          } ${getRefOperator(models, relatedTables[1], relatedTables[0])} ${
            relatedTables[1]
          }.${field.relationToFields!![0]}`
        );
      });
  });
  return refs;
};

const getRefOperator = (
  models: DMMF.Model[],
  from: string,
  to: string
): string => {
  const model = models.find((model) => model.name === from);
  const field = model?.fields.find((field) => field.type === to);
  return field?.isList ? '>' : '-';
};
