import {
  datamodelDbml,
  datamodelDbmlComments,
  datamodelDbmlDefaults,
  datamodelDbmlRelations,
} from './fixtures/dbml.datamodel';
import { generateDMMF } from './utils/generateDMMF';
import { generateDBMLSchema } from '../src/generator/dbml';

describe('DBML', () => {
  test('generating simple dbml schema', async () => {
    const dmmf = await generateDMMF(datamodelDbml);

    const expectedDbml = `Table User {
  id Int [pk, increment]
  name String [not null]
  profile Profile
  role Role [not null]
}

Table Profile {
  id Int [pk, increment]
  name String [not null]
  user User [not null]
  userId Int [not null]
}

Enum Role {
  ADMIN
  USER
}

Ref: Profile.userId - User.id`;

    const dbml = generateDBMLSchema(dmmf);

    expect(dbml).toEqual(expectedDbml);
  });

  test('generating dbml schema with comments', async () => {
    const dmmf = await generateDMMF(datamodelDbmlComments);

    const expectedDbml = `Table User {
  id Int [pk, increment]
  name String [not null]
  profile Profile
  role Role [not null, default: 'USER', note: 'User Role']
}

Table Profile {
  id Int [pk, increment]
  name String [not null]
  user User [not null]
  userId Int [not null]

  Note: 'User Profile model'
}

Enum Role {
  ADMIN
  USER
}

Ref: Profile.userId - User.id`;

    const dbml = generateDBMLSchema(dmmf);

    expect(dbml).toEqual(expectedDbml);
  });

  test('generating dbml schema with defaults', async () => {
    const dmmf = await generateDMMF(datamodelDbmlDefaults);

    const expectedDbml = `Table User {
  id String [pk]
  createdAt DateTime [default: \`now()\`, not null]
  name String
  email String [unique, not null]
  role Role [not null, default: 'USER']
  posts Post
}

Table Post {
  id Int [pk, increment]
  createdAt DateTime [default: \`now()\`, not null]
  updatedAt DateTime [not null]
  published Boolean [not null, default: false]
  title String [not null]
  author User
  authorId String
}

Enum Role {
  ADMIN
  USER
}

Ref: Post.authorId > User.id`;

    const dbml = generateDBMLSchema(dmmf);

    expect(dbml).toEqual(expectedDbml);
  });

  test('generating dbml schema with relationships', async () => {
    const dmmf = await generateDMMF(datamodelDbmlRelations);

    const expectedDbml = `Table User {
  id Int [pk, increment]
  posts Post
  profile Profile
}

Table Profile {
  id Int [pk, increment]
  user User [not null]
  userId Int [not null]
}

Table Post {
  id Int [pk, increment]
  author User [not null]
  authorId Int [not null]
}

Ref: Profile.userId - User.id

Ref: Post.authorId > User.id`;

    const dbml = generateDBMLSchema(dmmf);

    expect(dbml).toEqual(expectedDbml);
  });
});
