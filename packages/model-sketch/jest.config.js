const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: '@uxdm/model-sketch',
  displayName: '@uxdm/model-sketch',
  moduleNameMapper: {
    '@uxdm/model-sketch': '<rootDir>/src',
    uxdm: '<rootDir>/../uxdm/src',
    '@uxdm/model-sketch/(.*)$': '<rootDir>/src/$1',
    '@uxdm/schema': '<rootDir>/../schema/src',
    '^uuid': '<rootDir>/tests/__mocks__/uuid.ts',
  },
};
