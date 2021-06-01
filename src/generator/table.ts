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
  const hasIdFields = model.idFields.length > 0;
  const hasCompositeUniqueIndex = model.uniqueFields.length > 0;
  return hasIdFields || hasCompositeUniqueIndex
    ? `\n\n  ${DBMLKeywords.Indexes} {\n${generateTableBlockId(
        model.idFields
      )}${
        hasIdFields && hasCompositeUniqueIndex ? '\n' : ''
      }${generateTableCompositeUniqueIndex(model.uniqueFields)}\n  }`
    : '';
};

const generateTableBlockId = (idFields: string[]): string => {
  if (idFields.length === 0) {
    return '';
  }
  return `    (${idFields.join(', ')}) [${DBMLKeywords.Pk}]`;
};

const generateTableCompositeUniqueIndex = (
  uniqueFields: string[][]
): string => {
  return uniqueFields
    .map(
      (composite) => `    (${composite.join(', ')}) [${DBMLKeywords.Unique}]`
    )
    .join('\n');
};

const generateTableDocumentation = (model: DMMF.Model): string => {
  const doc = model.documentation?.replace("'", "\\'");
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
    columnDefinition.push(
      `${DBMLKeywords.Note}: '${field.documentation.replace("'", "\\'")}'`
    );
  }

  if (columnDefinition.length) {
    return ' [' + columnDefinition.join(', ') + ']';
  }
  return '';
};
