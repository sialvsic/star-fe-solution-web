import config_dev from './config.dev';
import config_prod from './config.prod';

let config: GConfig;

switch (process.env.APP_ENV) {
  case 'dev':
    config = config_dev;
    break;
  case 'prod':
    config = config_prod;
    break;
  default:
    config = config_dev;
    break;
}

export default config;
