import { Global, Module } from "@nestjs/common";
import ApplicationService from "./application.service";
import ApplicationRepository from "@shared/repositories/Application/Application.repository";
import ApplicationController from "./application.controller";

@Global()
@Module({
    providers: [
        {
            provide: ApplicationRepository,
            useClass: ApplicationService,
        },
    ],
    controllers: [ApplicationController],
    exports: [ApplicationRepository],
})
export default class ApplicationModule { }