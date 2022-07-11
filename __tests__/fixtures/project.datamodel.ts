export const datamodelUnnamedProject = /* Prisma */ `
  generator dbml {
    provider   = "prisma-dbml-generator"
    projectDatabaseType = "PostgreSQL"
    projectNote = "Test project description"
  }
`;

export const datamodelProjectWithNote = /* Prisma */ `
  generator dbml {
    provider   = "prisma-dbml-generator"
    projectName = "Test Project"
    projectDatabaseType = "PostgreSQL"
    projectNote = "Test project description"
  }
`;

export const datamodelProjectWithNoteMd = /* Prisma */ `
  generator dbml {
    provider   = "prisma-dbml-generator"
    projectName = "Test Project"
    projectDatabaseType = "PostgreSQL"
    projectNote = "Test project description"
    projectNotePath = "__tests__/mocks/projectNote.md"
  }
`;
