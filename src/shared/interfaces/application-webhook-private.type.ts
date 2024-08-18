import type { Application } from "@prisma/client";

type ApplicationWebhookPrivate = Pick<Application,
    'security_webhook_is_enabled' |
    'security_webhook_secret' |
    'security_webhook_url'
>;

export default ApplicationWebhookPrivate;