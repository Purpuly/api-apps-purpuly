import ApplicationRepository from '@core/repositories/Application/Application.repository';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export default class ApplicationIdMiddleware implements NestMiddleware {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
    ) { }

    async use(req: Request, _: any, next: NextFunction) {
        const applicationId = req.params.applicationId;

        if (!applicationId) {
            throw new HttpException(
                'We cannot process your request without a valid application identifier in the URL. e.g. /api/v1/:applicationId/x/y/z. Please provide a valid application identifier.',
                400,
            );
        } else {
            const application = await this.applicationRepository.getApplicationFromAppId(applicationId);

            console.log('application', application);

            req['applicationId'] = applicationId;

            next();
        }
    }
}