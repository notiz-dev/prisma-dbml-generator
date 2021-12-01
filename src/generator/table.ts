import { DBMLKeywords, PrismaScalars } from './../keywords';
import { DMMF } from '@prisma/generator-helper';

export function generateTables(models: DMMF.Model[]): string[] {
  return models.map(
    (model) =>
      `${DBMLKeywords.Table} ${model.name} {\n` +
      generateFields(model.fields) +
      generateTableIndexes(model) +
      generateTableDocumentation(model) +
      '\n}'
  );
}

const generateTableIndexes = (model: DMMF.Model): string => {
  const primaryFields = model.primaryKey?.fields;
  const hasIdFields = primaryFields && primaryFields.length > 0;
  const hasCompositeUniqueIndex = hasCompositeUniqueIndices(model.uniqueFields);
  return hasIdFields || hasCompositeUniqueIndex
    ? `\n\n  ${DBMLKeywords.Indexes} {\n${generateTableBlockId(primaryFields)}${
        hasIdFields && hasCompositeUniqueIndex ? '\n' : ''
      }${generateTableCompositeUniqueIndex(model.uniqueFields)}\n  }`
    : '';
};

const hasCompositeUniqueIndices = (uniqueFields: string[][]): boolean => {
  return uniqueFields.filter((composite) => composite.length > 1).length > 0;
};

const generateTableBlockId = (primaryFields: string[] | undefined): string => {
  if (primaryFields === undefined || primaryFields.length === 0) {
    return '';
  }
  return `    (${primaryFields.join(', ')}) [${DBMLKeywords.Pk}]`;
};

const generateTableCompositeUniqueIndex = (
  uniqueFields: string[][]
): string => {
  return uniqueFields
    .filter((composite) => composite.length > 1)
    .map(
      (composite) => `    (${composite.join(', ')}) [${DBMLKeywords.Unique}]`
    )
    .join('\n');
};

const generateTableDocumentation = (model: DMMF.Model): string => {
  const doc = model.documentation?.replace(/'/g, "\\'");
  return doc ? `\n\n  Note: '${doc}'` : '';
};

const generateFields = (fields: DMMF.Field[]): string => {
  return fields
    .map(
      (field) =>
        `  ${field.name} ${field.type}${generateColumnDefinition(field)}`
    )
    .join('\n');
};

const generateColumnDefinition = (field: DMMF.Field): string => {
  const columnDefinition: string[] = [];
  if (field.isId) {
    columnDefinition.push(DBMLKeywords.Pk);
  }

  if ((field.default as DMMF.FieldDefault)?.name === 'autoincrement') {
    columnDefinition.push(DBMLKeywords.Increment);
  }

  if ((field.default as DMMF.FieldDefault)?.name === 'now') {
    columnDefinition.push('default: `now()`');
  }

  if (field.isUnique) {
    columnDefinition.push(DBMLKeywords.Unique);
  }

  if (field.isRequired && !field.isId) {
    columnDefinition.push(DBMLKeywords.NotNull);
  }

  if (field.hasDefaultValue && typeof field.default != 'object') {
    if (
      field.type === PrismaScalars.String ||
      field.type === PrismaScalars.Json ||
      field.kind === 'enum'
    ) {
      columnDefinition.push(`${DBMLKeywords.Default}: '${field.default}'`);
    } else {
      columnDefinition.push(`${DBMLKeywords.Default}: ${field.default}`);
    }
  }

  if (field.documentation) {
    columnDefinition.push(
      `${DBMLKeywords.Note}: '${field.documentation.replace(/'/g, "\\'")}'`
    );
  }

  if (columnDefinition.length) {
    return ' [' + columnDefinition.join(', ') + ']';
  }
  return '';
};
