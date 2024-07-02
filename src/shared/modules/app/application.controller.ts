import { Controller, Get } from "@nestjs/common";
import PublicApplication from "@shared/interfaces/public-application.type";
import ApplicationRepository from "@core/repositories/Application/Application.repository";

@Controller()
export default class ApplicationController {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
    ) { }

    @Get('/public')
    public async getPublicApplicationInformations(): Promise<PublicApplication> {
        return await this.applicationRepository
            .extractPublicApplicationInformationsFromRequest();
    }
}
