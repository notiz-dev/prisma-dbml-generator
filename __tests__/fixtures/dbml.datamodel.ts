export const datamodelDbml = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    name String
    profile   Profile?
    role Role
  }
  model Profile {
    id Int @id @default(autoincrement())
    name String
    user   User    @relation(fields: [userId], references: [id])
    userId Int
  }
  enum Role {
    ADMIN
    USER
  }
`;

export const datamodelDbmlDefaults = /* Prisma */ `
  model User {
    id String @id @default(cuid())
    createdAt DateTime @default(now())
    name String?
    email String @unique
    role Role @default(USER)
    posts Post[]
  }
  model Post {
    id Int @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    published Boolean  @default(false)
    title     String
    author    User?    @relation(fields: [authorId], references: [id])
    authorId  String?
  }
  enum Role {
    ADMIN
    USER
  }
`;

export const datamodelDbmlRelations = /* Prisma */ `
  model User {
    id      Int      @id @default(autoincrement())
    posts   Post[]
    profile Profile?
  }
  model Profile {
    id      Int     @id @default(autoincrement())
    user    User    @relation(fields: [userId], references: [id])
    userId  Int
  }
  model Post {
    id         Int         @id @default(autoincrement())
    author     User        @relation(fields: [authorId], references: [id])
    authorId   Int
  }
`;

export const datamodelDbmlComments = /* Prisma */ `
  // User model
  model User {
    id Int @id @default(autoincrement())
    name String
    profile   Profile?
    role Role @default(USER) /// User Role
  }
  /// User Profile model
  model Profile {
    id Int @id @default(autoincrement())
    name String
    user   User    @relation(fields: [userId], references: [id])
    userId Int
  }
  enum Role {
    ADMIN // Chuck Norris
    USER
  }
`;

export const datamodelDbmlManyToMany = /* Prisma */ `
  model Post {
    id         Int        @id @default(autoincrement())
    categories Category[]
  }

  model Category {
    id    Int    @id @default(autoincrement())
    posts Post[]
  }

  model Author {
    id         Int        @id @default(autoincrement())
    books Book[]
  }

  model Book {
    id    Int    @id @default(autoincrement())
    authors Author[]
  }
`;
