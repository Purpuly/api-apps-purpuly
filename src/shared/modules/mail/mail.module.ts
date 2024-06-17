import { Global, Module } from "@nestjs/common";
import MailService from "./mail.service";
import MailRepository from "@shared/repositories/Mail/Mail.repository";

@Global()
@Module({
    providers: [
        {
            provide: MailRepository,
            useClass: MailService,
        },
    ],
    exports: [MailRepository],
})
export default class MailModule { }