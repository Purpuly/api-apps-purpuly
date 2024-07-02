import ApplicationRepository from '@core/repositories/Application/Application.repository';
import { HttpException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import ApplicationAdapter from '@shared/modules/app/application.adapter';
import { Request, NextFunction } from 'express';

const BYPASS_APPLICATION_CHECK_MIDDLEWARE: boolean = false;

@Injectable()
export default class ApplicationMiddleware implements NestMiddleware {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
    ) { }

    async use(req: Request, _: any, next: NextFunction) {
        const applicationId = req.params.applicationId;

        if (BYPASS_APPLICATION_CHECK_MIDDLEWARE) {
            req['applicationId'] = applicationId;
            next();
            return;
        }

        try {
            if (!applicationId) throw 'No application identifier found in the URL. Cannot proceed without a valid application identifier.';

            const application = await this.applicationRepository.getApplicationFromAppId(applicationId);

            if (!application) throw 'No application found with the provided application identifier.';

            req['applicationId'] = applicationId;

            const publicApplication =
                ApplicationAdapter.fromApplicationToPublicApplication(application);

            req['publicApplication'] = publicApplication;

            next();
        } catch (error) {
            // Logger.warn(`ApplicationIdMiddleware error: ${error}`);

            throw new HttpException(
                error.message || 'An error occurred while processing the request.',
                404,
            );
        }
    }
}