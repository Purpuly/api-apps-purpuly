import { Module } from "@nestjs/common";
import MailService from "@shared/modules/Mail/mail.service";
import ResetPasswordController from "./reset-password.controller";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";
import MailRepository from "@shared/repositories/Mail/Mail.repository";
import UserRepository from "@core/repositories/Authentication/User.repository";
import PasswordRepository from "@core/repositories/Authentication/Password.repository";
import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import UserRepositoryImplementation from "@core/implementations/user-repository.implementation";
import PasswordRepositoryImplementation from "@core/implementations/password-repository.implementation";
import ResetPasswordRepositoryImplementation from "@core/implementations/reset-password-repository.implementation";

@Module({
    providers: [
        {
            provide: MailRepository,
            useClass: MailService,
        },
        {
            provide: UserRepository,
            useClass: UserRepositoryImplementation,
        },
        {
            provide: ResetPasswordRepository,
            useClass: ResetPasswordRepositoryImplementation,
        },
        {
            provide: PasswordRepository,
            useClass: PasswordRepositoryImplementation,
        },
        RequestResetPasswordService,
        MutationResetPasswordService,
    ],
    controllers: [ResetPasswordController],
})
export default class ResetPasswordModule { }