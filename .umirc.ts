import { defineConfig } from 'umi';

let publicPath = '/';
let base = '/';

switch (process.env.APP_ENV) {
  case 'test':
    publicPath = '/dist/';
    base = '/dist';
    break;

  case 'prod':
    publicPath = '/dist/';
    base = '/dist';
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
