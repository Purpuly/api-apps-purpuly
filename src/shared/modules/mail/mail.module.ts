import { Module } from "@nestjs/common";
import MailService from "./mail.service";
import MailRepository from "@shared/repositories/Mail/Mail.repository";

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