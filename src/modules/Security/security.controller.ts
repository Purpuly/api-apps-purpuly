import { Controller, Get } from "@nestjs/common";
import PublicApplicationSecurityService from "./services/public-application-security.service";
import PublicApplicationSecurity from "@shared/interfaces/public-application-security.type";

@Controller()
export default class SecurityController {
    constructor(
        private readonly publicApplicationSecurityService: PublicApplicationSecurityService,
    ) { }

    @Get()
    public async getPublicApplicationSecurity(): Promise<PublicApplicationSecurity | null> {
        return await this.publicApplicationSecurityService.handle();
    }
}