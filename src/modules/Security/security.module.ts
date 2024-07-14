import { Module } from "@nestjs/common";
import SecurityController from "./security.controller";
import PublicApplicationSecurityService from "./services/public-application-security.service";

@Module({
    providers: [PublicApplicationSecurityService],
    controllers: [SecurityController],
})
export default class SecurityModule { }