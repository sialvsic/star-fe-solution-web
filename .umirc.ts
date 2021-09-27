import { defineConfig } from 'umi';

let publicPath = '/';
let base = '/';

switch (process.env.APP_ENV) {
  case 'prod':
    publicPath = '/web/dist/';
    base = '/web/dist';
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
});
