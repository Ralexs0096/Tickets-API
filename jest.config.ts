export default {
  testTimeout: 30000,
  projects: [
    {
      displayName: 'test',
      preset: 'ts-jest',
      testEnvironment: 'node',
      globalSetup: '<rootDir>/src/utils/createDatabase.ts',
      clearMocks: true,
      resetMocks: true,
      restoreMocks: true,
      setupFilesAfterEnv: ['<rootDir>/src/utils/setupTests.ts'],
      testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
      modulePathIgnorePatterns: ['<rootDir>/dist/'],
      moduleFileExtensions: ['ts', 'json', 'js'],
    },
  ],
};
