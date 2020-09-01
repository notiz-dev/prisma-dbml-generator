import { generateDMMF } from './utils/generateDMMF';
import {
  datamodelOneToOne,
  datamodelManyToOne,
  datamodelManyToOneSecond,
  datamodelOneToOneAndManyToOne,
} from './fixtures/relations.datamodel';
import { generateRelations } from '../src/generator/relations';

describe('Relations', () => {
  test('generating one-to-one relationship', async () => {
    const dmmf = await generateDMMF(datamodelOneToOne);

    const expected = 'Ref: Profile.userId - User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
  });

  test('generating one-to-one and many-to-one relationship', async () => {
    const dmmf = await generateDMMF(datamodelOneToOneAndManyToOne);

    const expected = 'Ref: Profile.userId - User.id';
    const expectedSecond = 'Ref: Post.authorId > User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
    expect(relations[1]).toMatch(expectedSecond);
  });

  test('generating many-to-one relationship', async () => {
    const dmmf = await generateDMMF(datamodelManyToOne);

    const expected = 'Ref: Post.authorId > User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
  });

  test('generating many-to-one relationship second', async () => {
    const dmmf = await generateDMMF(datamodelManyToOneSecond);

    const expected =
      'Ref: OrganizationPermission.organizationId > Organization.id';
    const expectedSecond = 'Ref: OrganizationPermission.userId > User.id';

    const relations = generateRelations(dmmf.datamodel.models);
    expect(relations[0]).toMatch(expected);
    expect(relations[1]).toMatch(expectedSecond);
  });
});
