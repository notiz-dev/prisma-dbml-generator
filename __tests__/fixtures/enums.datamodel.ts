export const datamodelSingleEnum = /* Prisma */ `
  model User {
    id Int @id @default(autoincrement())
    role Role
  }
  enum Role {
    ADMIN
    USER
  }
`;
