import { Module } from "@nestjs/common";
import ResetPasswordController from "./reset-password.controller";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";
import MailRepository from "@shared/repositories/Mail/Mail.repository";
import MailService from "@shared/modules/Mail/mail.service";

@Module({
    providers: [
        {
            provide: MailRepository,
            useClass: MailService,
        },
        RequestResetPasswordService,
        MutationResetPasswordService,
    ],
    controllers: [ResetPasswordController],
})
export default class ResetPasswordModule { }