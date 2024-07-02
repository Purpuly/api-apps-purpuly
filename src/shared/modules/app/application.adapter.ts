import type { Application } from "@prisma/client";
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
            isActive: application.isActive,
        };
    }
};