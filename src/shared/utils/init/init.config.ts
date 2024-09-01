const REQUIRED_CONFIGURATION: string[] = [
  'DATABASE_URL', // Database URL (Postgres)
  'MJ_APIKEY_PUBLIC', // Mailjet API Key Public
  'MJ_APIKEY_PRIVATE', // Mailjet API Key Private
];

const PURPULY_ONLY_ENDPOINTS_REGEX: string =
  '^(https?://(?:.+.)?purpuly.com(?::d{1,5})?)$';

const FALLBACK_PORT: number = 9090;

const APPLICATION_LISTENING_PORT: string | number = process.env.PORT || FALLBACK_PORT;

export {
  REQUIRED_CONFIGURATION,
  PURPULY_ONLY_ENDPOINTS_REGEX,
  APPLICATION_LISTENING_PORT,
};
