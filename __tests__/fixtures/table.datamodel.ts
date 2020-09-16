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
