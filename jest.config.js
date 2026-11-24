module.exports = {
  preset: 'jest-expo',
  globalSetup: './jest.global-setup.js',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
};
