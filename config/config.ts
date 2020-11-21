import { defineConfig } from 'umi';
import { resolve } from 'path';
const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'uxdm',
  mode: 'site',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  navs: [
    null,
    {
      title: 'API',
      path: isProdSite ? '/api' : 'http://localhost:5000',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/uxdm/uxdm',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },
  hash: true,
});
