import { DBMLKeywords } from './../keywords';
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
  const hasTableIndexes =
    model.idFields.length > 0 || model.uniqueFields.length > 0;
  return hasTableIndexes
    ? `\n\n  ${DBMLKeywords.Indexes} {\n${generateTableUniqueFields(
        model.uniqueFields
      )}\n  }`
    : '';
};

const generateTableUniqueFields = (uniqueFields: string[][]): string => {
  return uniqueFields
    .map(
      (composite) => `    (${composite.join(', ')}) [${DBMLKeywords.Unique}]`
    )
    .join('\n');
};

const generateTableDocumentation = (model: DMMF.Model): string => {
  const doc = model.documentation;
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
  const columnDefinition = [];
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
    if (field.type === 'String' || field.kind === 'enum') {
      columnDefinition.push(`${DBMLKeywords.Default}: '${field.default}'`);
    } else {
      columnDefinition.push(`${DBMLKeywords.Default}: ${field.default}`);
    }
  }

  if (field.documentation) {
    columnDefinition.push(`${DBMLKeywords.Note}: '${field.documentation}'`);
  }

  if (columnDefinition.length) {
    return ' [' + columnDefinition.join(', ') + ']';
  }
  return '';
};
