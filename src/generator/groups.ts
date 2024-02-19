import { DMMF } from '@prisma/generator-helper';

export function generateGroups(
  models: DMMF.Model[]
): string[] {
  return models
    // Only care about dbName
    .map(m => m.dbName.split('_')[0])
    // Keep only groups that occur _more_ than once
    .filter((v, i, a) => a.indexOf(v) !== i)
    // Remove duplicates
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((group) => `TableGroup ${group} {
  ${models.filter(m => m.dbName.split('_')[0] === group).map(t => t.dbName).join('\n  ')}
}`)
}
