export const datamodelOneToOne = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    profile   Profile?
  }
  model Profile {
    id Int @id @default(autoincrement())
    name String
    user   User    @relation(fields: [userId], references: [id])
    userId Int
  }
`;

export const datamodelManyToOne = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    posts   Post[]
  }
  model Post {
    id Int @id @default(autoincrement())
    name String
    author   User    @relation(fields: [authorId], references: [id])
    authorId Int
  }
`;
