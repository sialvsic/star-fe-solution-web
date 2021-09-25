import { defineConfig } from 'umi';

let publicPath = '/';
let base = '/';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  base,
  publicPath,
});
