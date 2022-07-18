import { getDMMF } from '@prisma/internals';
import { DMMF } from '@prisma/generator-helper';

export function generateDMMF(datamodel: string): Promise<DMMF.Document> {
  return getDMMF({ datamodel });
}
