import { defineConfig } from 'umi';

let publicPath = '/';
let base = '/';

switch (process.env.APP_ENV) {
  case 'prod':
    publicPath = '/web/';
    base = '/web';
    break;

  default:
    publicPath = '/';
    base = '/';
    break;
}

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  base,
  publicPath,
  hash: true,
  define: {
    'process.env.APP_ENV': process.env.APP_ENV,
  },
  proxy: {
    '/api': {
      target: 'http://dev.fe-solution.com:4000/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
