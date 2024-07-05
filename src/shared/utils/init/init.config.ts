const REQUIRED_CONFIGURATION = [
  'DATABASE_URL', // Database URL (Postgres)
  'MJ_APIKEY_PUBLIC', // Mailjet API Key Public
  'MJ_APIKEY_PRIVATE', // Mailjet API Key Private
];

const PURPULY_ONLY_ENDPOINTS_REGEX =
  '^(https?://(?:.+.)?purpuly.com(?::d{1,5})?)$';

const FALLBACK_PORT = 8080;

const APPLICATION_LISTENING_PORT = process.env.PORT || FALLBACK_PORT;

export {
  REQUIRED_CONFIGURATION,
  PURPULY_ONLY_ENDPOINTS_REGEX,
  APPLICATION_LISTENING_PORT,
};
