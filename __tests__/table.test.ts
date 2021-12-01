import {
  datamodelSingleTable,
  datamodelTableWithBlockId,
  datamodelTableWithBlockIdAndCompositeUnqiue,
  datamodelTableWithJsonDefault,
  datamodelTableWithOneCompositeUniqueIndex,
  datamodelTableWithSingleCompositeUniqueIndex,
  datamodelTableWithStringDefaults,
  datamodelTableWithThreeFieldsCompositeUniqueIndex,
  datamodelTableWithTwoCompositeUniqueIndex,
  datamodelTableWithMultiQuoteComment,
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
    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

  test('generate a table with empty string default', async () => {
    const dmmf = await generateDMMF(datamodelTableWithStringDefaults);

    const expected = `Table Post {
  id Int [pk, increment]
  title String [not null, default: '']
  color String [not null, default: 'blue']
}`;
    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

  test('generate a table with single composite unique index', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithSingleCompositeUniqueIndex
    );

    const expected = `Table A {
  id Int [pk, increment]
  b String [unique, not null]
}`;

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
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

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
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

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
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

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

  test('generate a table with block id', async () => {
    const dmmf = await generateDMMF(datamodelTableWithBlockId);

    const expected = `Table User {
  firstName String [not null]
  lastName String [not null]
  email String [unique, not null]
  isAdmin Boolean [not null, default: false]

  indexes {
    (firstName, lastName) [pk]
  }
}`;

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

  test('generate a table with block id and composite unique index', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithBlockIdAndCompositeUnqiue
    );

    const expected = `Table User {
  firstName String [not null]
  lastName String [not null]
  email String [not null]
  role String [not null]
  isAdmin Boolean [not null, default: false]

  indexes {
    (firstName, lastName) [pk]
    (email, role) [unique]
  }
}`;

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

    test('generate a table with comment with multiple quotes', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithMultiQuoteComment
    );

    const expected = `Table Example {
  id String [pk]
  serial BigInt [not null, default: 0, note: '@FieldType({ name: \\'Scalars.GraphQLBigInt\\', from: \\'graphql-scalars\\', input: true, output: true })']
}`;

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });

  
  test('generate a table with json default', async () => {
    const dmmf = await generateDMMF(
      datamodelTableWithJsonDefault
    );

    const expected = `Table Example {
  id String [pk]
  jsonField Json [not null, default: '{"example": 0.7}']
}`;

    const tables = generateTables(dmmf.datamodel.models);

    expect(tables.length).toEqual(1);
    expect(tables[0]).toMatch(expected);
  });
});
