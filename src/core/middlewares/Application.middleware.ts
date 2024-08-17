import ApplicationRepository from '@shared/repositories/Application/Application.repository';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import ApplicationAdapter from '@shared/adapters/Application.adapter';
import { Request, NextFunction } from 'express';

@Injectable()
export default class ApplicationMiddleware implements NestMiddleware {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
    ) { }

    async use(req: Request, _: any, next: NextFunction) {
        const applicationId = req.params.applicationId;

        try {
            if (!applicationId) throw 'No application identifier found in the URL. Cannot proceed without a valid application identifier.';

            const application = await this.applicationRepository
                .getApplicationFromAppId(applicationId);

            if (!application) throw `No application found on Purpuly Services with the provided application identifier: '${applicationId}'.`;

            req['applicationId'] = applicationId;

            const publicApplication =
                ApplicationAdapter.fromApplicationToPublicApplication(application);

            req['publicApplication'] = publicApplication;

            next();
        } catch (error) {
            throw new HttpException(
                error || 'An error occurred while processing the request.',
                404,
            );
        }
    }
}