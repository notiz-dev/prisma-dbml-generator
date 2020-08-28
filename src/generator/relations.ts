import { DMMF } from '@prisma/generator-helper';

export function generateRefs(models: DMMF.Model[]): string[] {
  const refs: string[] = [];
  models.forEach((model) => {
    model.fields
      .filter(
        (field) =>
          field.relationName &&
          field.relationToFields?.length &&
          field.relationFromFields?.length
      )
      .forEach((field) => {
        const relatedTables = field.relationName!!.split('To');
        refs.push(
          `Ref: ${relatedTables[0]}.${combineKeys(
            field.relationFromFields!
          )} ${getRefOperator(models, relatedTables[1], relatedTables[0])} ${
            relatedTables[1]
          }.${combineKeys(field.relationToFields!!)}`
        );
      });
  });
  return refs;
}

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
