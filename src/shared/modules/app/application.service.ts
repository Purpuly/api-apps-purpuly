import ApplicationRepository from "@core/repositories/Application/Application.repository";
import { Injectable } from "@nestjs/common";
import { Application } from "@prisma/client";
import DatabaseService from "../database/database.service";

@Injectable()
export default class ApplicationService implements ApplicationRepository {
    constructor(
        private readonly databaseService: DatabaseService
    ) { }

    async getApplicationFromAppId(app_id: string): Promise<Application | null> {
        return await this.databaseService.application.findFirst({
            where: {
                id: app_id
            }
        });
    }
}