const path = require('path');

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  testRegex: '(/tests/.*.(test|spec)).tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  moduleNameMapper: {
    '^uxdm/(.*)$': '<rootDir>/packages/uxdm/src/$1',
    '^uxdm$': '<rootDir>/packages/uxdm/src',
    '^@uxdm/schema/(.*)$': '<rootDir>/packages/schema/src/$1',
    '^@uxdm/schema': '<rootDir>/packages/schema/src',
    '^@uxdm/model-sketch/(.*)$': '<rootDir>/packages/model-sketch/src/$1',
    '^@uxdm/model-sketch': '<rootDir>/packages/model-sketch/src',
    '^@uxdm/model-konva/(.*)$': '<rootDir>/packages/model-konva/src/$1',
    '^@uxdm/model-konva': '<rootDir>/packages/model-konva/src',
  },
  rootDir: path.resolve(__dirname, '.'),
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
