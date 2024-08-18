import type { Application } from "@prisma/client";
import type ApplicationWebhookPrivate from "@shared/interfaces/application-webhook-private.type";
import type PublicApplication from "@shared/interfaces/public-application.type";

export default class ApplicationAdapter {
    public static fromApplicationToPublicApplication(
        application: Application
    ): PublicApplication {
        return {
            appId: application.id,
            name: application.name,
            description: application.description,
            baseUrl: application.url,
            logoUrl: application.image_url,
            isActive: application.is_active,
            webhookFeatureIsEnabled: application.security_webhook_is_enabled,
        };
    }

    public static fromApplicationToApplicationWebhookPrivate(
        application: Application
    ): ApplicationWebhookPrivate {
        return {
            security_webhook_is_enabled: application.security_webhook_is_enabled,
            security_webhook_secret: application.security_webhook_secret,
            security_webhook_url: application.security_webhook_url,
        };
    }
};