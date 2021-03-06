module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    page: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/default': 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default-member': 0,
    'import/named': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    'no-continue': 0,
    'no-shadow': 'warn',
    'no-console': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['uxdm', './packages/uxdm/src'],
          ['@uxdm/schema', './packages/schema/src'],
          ['@uxdm/model-sketch', './packages/model-sketch/src'],
        ],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
