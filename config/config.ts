import { defineConfig } from 'umi';
import { resolve } from 'path';
const isProdSite =
  // 不是预览模式 同时是生产环境
  process.env.PREVIEW !== '1' && process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'uxdm',
  // logo: 'https://gw.alipayobjects.com/zos/antfincdn/8AsXJa8sgo/Logo.svg',
  mode: 'site',
  // 部署在非根目录时, base 和 publicPath 都需要配置
  // base: isProdSite ? '/uxdm/' : '/',
  // publicPath: isProdSite ? '/uxdm/' : '/',
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
      title: 'GitHub',
      path: 'https://github.com/uxdm/uxdm',
    },
  ],
  dynamicImport: {
    loading: '@ant-design/pro-skeleton',
  },

  hash: true,
});
