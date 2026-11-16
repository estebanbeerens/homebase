module.exports = {
  displayName: 'lint-tests',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['@swc/jest', { jsc: { parser: { syntax: 'typescript' } } }],
  },
  moduleFileExtensions: ['ts', 'js'],
  testTimeout: 60000,
};
