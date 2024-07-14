import type { Application, ApplicationSecurity } from "@prisma/client";
import type PublicApplication from "@shared/interfaces/public-application.type";
import type PublicApplicationSecurity from "@shared/interfaces/public-application-security.type";

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
        };
    }

    public static fromApplicationSecurityToPublicApplicationSecurity(
        applicationSecurity: ApplicationSecurity
    ): PublicApplicationSecurity {
        return {
            publicKey: applicationSecurity.public_key,
            securityRulesId: applicationSecurity.id,
            webhookFeatureIsEnabled: applicationSecurity.webhook_is_enabled,
        };
    }
};