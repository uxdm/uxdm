const base = require('../../jest.config.base');

const packageName = 'uxdm';

const root = `<rootDir>/packages/${packageName}`;

module.exports = {
  ...base,
  rootDir: '../..',
  roots: [root],
  name: packageName,
  displayName: packageName,
  modulePaths: [`${root}/src/`],
  moduleNameMapper: {
    ...base.moduleNameMapper,
    '^nanoid$': `${root}/tests/__mocks__/nanoid.ts`,
  },
};
