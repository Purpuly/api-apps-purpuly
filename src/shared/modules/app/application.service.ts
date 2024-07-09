// import applications from "./application.fixtures";
import ApplicationRepository from "@core/repositories/Application/Application.repository";
import { Inject, Injectable } from "@nestjs/common";
import { Application } from "@prisma/client";
import DatabaseService from "../database/database.service";
import { REQUEST } from "@nestjs/core";
import PublicApplication from "@shared/interfaces/public-application.type";

@Injectable()
export default class ApplicationService implements ApplicationRepository {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly databaseService: DatabaseService
    ) { }

    public async getApplicationFromAppId(app_id: string): Promise<Application | null> {
        // TEST ONLY : return applications.find(app => app.id === app_id) || null;

        return await this.databaseService.application.findFirst({
            where: {
                id: app_id
            }
        });
    }

    public async extractPublicApplicationInformationsFromRequest(): Promise<PublicApplication> {
        return this.request['publicApplication'];
    }
}