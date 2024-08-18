export default interface ApplicationInitBaseConfig {
  isProductionEnv: boolean;
  listeningPort: string;
  allowOrigin: string;
  rawBody: boolean;
}
