const base = require('../../jest.config.base');

const packageName = 'model-sketch';

const root = '<rootDir>/packages/model-sketch';

module.exports = {
  ...base,
  rootDir: '../..',
  roots: [root],
  name: packageName,
  displayName: packageName,
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^uuid$': `${root}/tests/__mocks__/uuid.ts`,
  },
};
