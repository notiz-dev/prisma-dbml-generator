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

        // await writeFile('./test.json', JSON.stringify(options.dmmf.datamodel));
        const tables = generateTables(options.dmmf.datamodel.models);
        const enums = generateEnums(options.dmmf.datamodel.enums);
        const refs = generateRefs(options.dmmf.datamodel.models);

        const dbmlContent = [...tables, ...enums, ...refs].join('\n\n');

        await writeFile(
          join(options.generator.output, 'schema.dbml'),
          dbmlContent
        );
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
    (model) => `Table ${model.name} {\n` + generateFields(model.fields) + '\n}'
  );
};

const generateFields = (fields: DMMF.Field[]): string => {
  return fields
    .map(
      (field) =>
        `\t${field.name} ${field.type}${generateColumnDefinition(field)}`
    )
    .join('\n');
};

const generateColumnDefinition = (field: DMMF.Field): string => {
  const columnDefinition = [];
  if (field.isId) {
    columnDefinition.push('pk');
  }

  if ((field.default as DMMF.FieldDefault)?.name === 'autoincrement') {
    columnDefinition.push('increment');
  }

  if ((field.default as DMMF.FieldDefault)?.name === 'now') {
    columnDefinition.push('default: `now()`');
  }

  if (field.isUnique) {
    columnDefinition.push('unique');
  }

  if (field.isRequired && !field.isId) {
    columnDefinition.push('not null');
  }

  if (
    typeof field.default === 'string' ||
    typeof field.default === 'boolean' ||
    typeof field.default === 'number'
  ) {
    columnDefinition.push(`default: ${field.default}`);
  }

  if ((field as any).documentation) {
    columnDefinition.push(`note: '${(field as any).documentation}'`);
  }

  if (columnDefinition.length) {
    return ' [' + columnDefinition.join(', ') + ']';
  }
  return '';
};

const generateEnums = (enums: DMMF.DatamodelEnum[]): string[] => {
  return enums.map(
    (e) => `Enum ${e.name} {\n` + generateEnumValues(e.values) + '\n}'
  );
};

const generateEnumValues = (values: DMMF.EnumValue[]): string => {
  return values.map((value) => `\t${value.name}`).join('\n');
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
          `Ref: ${relatedTables[0]}.${combineKeys(
            (field as any).relationFromFields
          )} ${getRefOperator(models, relatedTables[1], relatedTables[0])} ${
            relatedTables[1]
          }.${combineKeys(field.relationToFields!!)}`
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
// Composite foreign keys:
// Ref: merchant_periods.(merchant_id, country_code) > merchants.(id, country_code)
const combineKeys = (keys: string[]): string => {
  return keys.length > 1 ? `(${keys.join(', ')})` : keys[0];
};
