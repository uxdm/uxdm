const base = require('../../.fatherrc');
export default {
  ...base,
  entry: 'src/index.tsx',
  pkgs: ['uxdm'],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      { libraryName: 'antd', libraryDirectory: 'es', style: true },
      'antd',
    ],
  ],
};
