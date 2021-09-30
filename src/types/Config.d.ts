type Environment = 'dev' | 'production';

declare interface GConfig {
  API_ROOT: string;
  environment: string;
  devEnv?: boolean;
  prodEnv?: boolean;
}
