import { Application } from "@prisma/client";

export default abstract class ApplicationRepository {
    abstract getApplicationFromAppId(app_id: string): Promise<Application>;
}