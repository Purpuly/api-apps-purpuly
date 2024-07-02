import ApplicationRepository from '@core/repositories/Application/Application.repository';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

const BYPASS_APPLICATION_CHECK_MIDDLEWARE: boolean = true;

@Injectable()
export default class ApplicationIdMiddleware implements NestMiddleware {
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

            console.log('application resolved, middleware passed', application);

            req['applicationId'] = applicationId;

            next();
        } catch (error) {
            console.error('ApplicationIdMiddleware error:', error);

            throw new HttpException(
                error.message || 'An error occurred while processing the request.',
                400,
            );
        }
    }
}