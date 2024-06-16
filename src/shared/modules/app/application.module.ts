import { Global, Module } from "@nestjs/common";
import ApplicationService from "./application.service";
import ApplicationRepository from "@core/repositories/Application/Application.repository";

@Global()
@Module({
    providers: [
        {
            provide: ApplicationRepository,
            useClass: ApplicationService,
        },
    ],
    exports: [ApplicationRepository],
})
export default class ApplicationModule { }