const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    'uxdm-model-sketch': './src/index.ts',
    'uxdm-model-sketch.min': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    library: '@uxdm/model-sketch',
    libraryExport: 'default',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/typescript', '@babel/env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              [
                '@babel/env',
                {
                  loose: true,
                  modules: false,
                },
              ],
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/proposal-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
  externals: [
    {
      uxdm: 'uxdm',
    },
  ],

  node: { fs: 'empty' },
};
