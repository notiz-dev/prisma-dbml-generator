import { datamodelSingleTable } from './fixtures/table.datamodel';
import { generateDMMF } from './utils/generateDMMF';
import { generateTables } from '../src/generator/table';

describe('Tables', () => {
  test('generate a table', async () => {
    const dmmf = await generateDMMF(datamodelSingleTable);

    const expected = `Table User {
  id Int [pk, increment]
  name String [not null]
  age Int
}`;
    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });
});
