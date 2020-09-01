module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/fixtures/',
    '<rootDir>/__tests__/utils/',
  ],
};
