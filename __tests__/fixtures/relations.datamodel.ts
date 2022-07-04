export const datamodelWithoutRelation = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
  }
  model Profile {
    id Int @id @default(autoincrement())
    name String
  }
`;

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
    userId Int @unique
  }
`;

export const datamodelOneToOneAndManyToOne = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    profile   Profile?
    posts Post[]
  }
  model Profile {
    id Int @id @default(autoincrement())
    name String
    user   User    @relation(fields: [userId], references: [id])
    userId Int @unique
  }
  model Post {
    id Int @id @default(autoincrement())
    name String
    author User @relation(fields: [authorId], references: [id])
    authorId Int
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

export const datamodelManyToOneSecond = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    organizationPermissions OrganizationPermission[]
  }
  model Organization {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    name      String

    permissions OrganizationPermission[]
  }

  model OrganizationPermission {
    id        Int              @id @default(autoincrement())
    createdAt DateTime         @default(now())
    updatedAt DateTime         @updatedAt

    organization   Organization @relation(fields: [organizationId], references: [id])
    organizationId Int

    user   User @relation(fields: [userId], references: [id])
    userId Int

    accepted Boolean @default(false)
    @@unique([userId, organizationId])
  }
`;
