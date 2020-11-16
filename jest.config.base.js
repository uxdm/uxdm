module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Adding this line solved the issue
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/tests/.*.(test|spec)).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$', 'tests/**/*.ts'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
