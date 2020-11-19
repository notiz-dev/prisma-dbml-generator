export const datamodelSingleTable = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    age Int?
  }
`;

export const datamodelTableWithStringDefaults = /* Prisma */ `
  model Post {
    id Int @id @default(autoincrement())
    title String @default("")
    color String @default("blue")
  }
`;

export const datamodelTableWithSingleCompositeUniqueIndex = /* Prisma */ `
  model A {
    id Int @id @default(autoincrement())
    b String

    @@unique([b])
  }
`;

export const datamodelTableWithThreeFieldsCompositeUniqueIndex = /* Prisma */ `
  model A {
    id Int @id @default(autoincrement())
    b String
    c Int
    d DateTime

    @@unique([d, b, c])
  }
`;

export const datamodelTableWithOneCompositeUniqueIndex = /* Prisma */ `
  model Token {
    id Int @id @default(autoincrement())
    device String
    operatingSystem String

    @@unique([device, operatingSystem])
  }
`;

export const datamodelTableWithTwoCompositeUniqueIndex = /* Prisma */ `
  model A {
    id Int @id @default(autoincrement())
    b String
    c String
    d Int
    e DateTime

    @@unique([b, d])
    @@unique([e, c])
  }
`;

export const datamodelTableWithBlockId = /* Prisma */ `
  model User {
    firstName String
    lastName  String
    email     String  @unique
    isAdmin   Boolean @default(false)

    @@id([firstName, lastName])
  }
`;

export const datamodelTableWithBlockIdAndCompositeUnqiue = /* Prisma */ `
  model User {
    firstName String
    lastName  String
    email     String
    role      String
    isAdmin   Boolean @default(false)

    @@id([firstName, lastName])
    @@unique([email, role])
  }
`;
