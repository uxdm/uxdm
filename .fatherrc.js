module.exports = {
  entry: 'src/index.ts',
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
};
