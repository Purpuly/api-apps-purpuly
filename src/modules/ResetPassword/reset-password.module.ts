import { Module } from "@nestjs/common";
import ResetPasswordController from "./reset-password.controller";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";

@Module({
    providers: [
        RequestResetPasswordService,
        MutationResetPasswordService,
    ],
    controllers: [ResetPasswordController],
})
export default class ResetPasswordModule { }