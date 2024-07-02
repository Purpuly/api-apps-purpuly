import { Application } from "@prisma/client";
import PublicApplication from "@shared/interfaces/public-application.type";

export default abstract class ApplicationRepository {
    abstract getApplicationFromAppId(app_id: string): Promise<Application>;
    abstract extractPublicApplicationInformationsFromRequest(): Promise<PublicApplication>;
}