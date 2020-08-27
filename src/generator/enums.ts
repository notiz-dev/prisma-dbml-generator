import { DMMF } from "@prisma/generator-helper";

export function generateEnums(enums: DMMF.DatamodelEnum[]): string[] {
  return enums.map(
    (e) => `Enum ${e.name} {\n` + generateEnumValues(e.values) + '\n}'
  );
};

const generateEnumValues = (values: DMMF.EnumValue[]): string => {
  return values.map((value) => `  ${value.name}`).join('\n');
};
