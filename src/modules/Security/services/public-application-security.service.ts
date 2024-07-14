import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ApplicationSecurity } from "@prisma/client";
import ApplicationAdapter from "@shared/adapters/Application.adapter";
import PublicApplicationSecurity from "@shared/interfaces/public-application-security.type";
import applicationSecurity from "@shared/modules/app/application-security.fixtures";

@Injectable()
export default class PublicApplicationSecurityService {
    private readonly applicationId: string;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
    ) {
        this.applicationId = this.request['applicationId'];
    }

    public async handle(): Promise<PublicApplicationSecurity | null> {
        const applicationId: string = this.applicationId;

        const app = this.getApplicationSecurityFromAppId(applicationId);

        return ApplicationAdapter
            .fromApplicationSecurityToPublicApplicationSecurity(app);
    }

    private getApplicationSecurityFromAppId(app_id: string): ApplicationSecurity | null {
        return applicationSecurity.find(app => app.app_id === app_id) || null;
    }
}