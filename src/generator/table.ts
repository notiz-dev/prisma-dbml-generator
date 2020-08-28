import { DMMF } from '@prisma/generator-helper';

export function generateTables(models: DMMF.Model[]): string[] {
  return models.map(
    (model) =>
      `Table ${model.name} {\n` +
      generateFields(model.fields) +
      generateTableDocumentation(model) +
      '\n}'
  );
}

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
    if (field.kind === 'enum') {
      columnDefinition.push(`default: '${field.default}'`);
    } else {
      columnDefinition.push(`default: ${field.default}`);
    }
  }

  if (field.documentation) {
    columnDefinition.push(`note: '${field.documentation}'`);
  }

  if (columnDefinition.length) {
    return ' [' + columnDefinition.join(', ') + ']';
  }
  return '';
};
