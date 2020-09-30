import { DMMF } from '@prisma/generator-helper';

export function generateEnums(enums: DMMF.Enum[]): string[] {
  return enums.map(
    (e) => `Enum ${e.name} {\n` + generateEnumValues(e.values) + '\n}'
  );
}

const generateEnumValues = (values: string[]): string => {
  return values.map((value) => `  ${value}`).join('\n');
};
