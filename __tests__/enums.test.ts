import { datamodelSingleEnum } from './fixtures/enums.datamodel';
import { generateDMMF } from './utils/generateDMMF';
import { generateEnums } from '../src/generator/enums';

describe('Enums', () => {
  test('generate an enum', async () => {
    const dmmf = await generateDMMF(datamodelSingleEnum);

    const expected = `Enum Role {
  ADMIN
  USER
}`;
    const enums = generateEnums(dmmf.datamodel.enums);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });
});
