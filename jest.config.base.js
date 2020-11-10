module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/tests/.*.(test|spec)).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    uxdm: '<rootDir>/src',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: ['(tests/.*.mock).(jsx?|tsx?)$'],
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
