export interface ApplicationInitBaseConfig {
  isProductionEnv: boolean;
  listeningPort: string;
  allowOrigin: string;
  rawBody: boolean;
}
