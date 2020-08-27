import { DMMF } from '@prisma/generator-helper';
import { generateTables } from './table';
import { generateEnums } from './enums';
import { generateRefs } from './relations';

export function generateDBMLSchema(dmmf: DMMF.Document): string {
  const tables = generateTables(dmmf.datamodel.models);
  const enums = generateEnums(dmmf.datamodel.enums);
  const refs = generateRefs(dmmf.datamodel.models);

  return [...tables, ...enums, ...refs].join('\n\n');
}
