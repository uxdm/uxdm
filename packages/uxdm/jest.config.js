const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: 'uxdm',
  displayName: 'uxdm',
  moduleNameMapper: {
    uxdm: '<rootDir>/src',
    '^uxdm/(.*)$': '<rootDir>/src/$1',
    '@uxdm/schema': '<rootDir>/../schema/src',
    '^nanoid$': '<rootDir>/tests/__mocks__/nanoid.ts',
  },
};
