import {
  datamodelSingleTable,
  datamodelTableWithOneCompositeUniqueIndex,
  datamodelTableWithSingleCompositeUniqueIndex,
  datamodelTableWithStringDefaults,
  datamodelTableWithThreeFieldsCompositeUniqueIndex,
  datamodelTableWithTwoCompositeUniqueIndex,
} from './fixtures/table.datamodel';
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

  test('generate a table with empty string default', async () => {
    const dmmf = await generateDMMF(datamodelTableWithStringDefaults);

    const expected = `Table Post {
  id Int [pk, increment]
  title String [not null, default: '']
  color String [not null, default: 'blue']
}`;
    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });

  test('generate a table with single composite unique index', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithSingleCompositeUniqueIndex
    );

    const expected = `Table A {
  id Int [pk, increment]
  b String [not null]

  indexes {
    (b) [unique]
  }
}`;

    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });

  test('generate a table with three fields as composite unique index', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithThreeFieldsCompositeUniqueIndex
    );

    const expected = `Table A {
  id Int [pk, increment]
  b String [not null]
  c Int [not null]
  d DateTime [not null]

  indexes {
    (d, b, c) [unique]
  }
}`;

    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });

  test('generate a table with one composite unique index', async () => {
    const dmmf = await generateDMMF(datamodelTableWithOneCompositeUniqueIndex);

    const expected = `Table Token {
  id Int [pk, increment]
  device String [not null]
  operatingSystem String [not null]

  indexes {
    (device, operatingSystem) [unique]
  }
}`;

    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });

  test('generate a table with two composite unique index', async () => {
    const dmmf = await generateDMMF(datamodelTableWithTwoCompositeUniqueIndex);

    const expected = `Table A {
  id Int [pk, increment]
  b String [not null]
  c String [not null]
  d Int [not null]
  e DateTime [not null]

  indexes {
    (b, d) [unique]
    (e, c) [unique]
  }
}`;

    const enums = generateTables(dmmf.datamodel.models);

    expect(enums.length).toEqual(1);
    expect(enums[0]).toMatch(expected);
  });
});
