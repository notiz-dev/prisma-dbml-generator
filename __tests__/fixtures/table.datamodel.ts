export const datamodelSingleTable = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    age Int?
  }
`;
