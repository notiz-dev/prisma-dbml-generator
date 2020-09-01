import { generateDMMF } from './utils/generateDMMF';
import { datamodelOneToOne, datamodelManyToOne } from './fixtures/datamodels';
import { generateRelations } from '../src/generator/relations';

describe('Relations', () => {
  test('generating one-to-one relationship', async () => {
    const dmmf = await generateDMMF(datamodelOneToOne);

    const expected = 'Ref: Profile.userId - User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
  });

  test('generating many-to-one relationship', async () => {
    const dmmf = await generateDMMF(datamodelManyToOne);

    const expected = 'Ref: Post.authorId > User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
  });
});
