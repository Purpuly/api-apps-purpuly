import { Module } from "@nestjs/common";
import ResetPasswordController from "./reset-password.controller";
import RequestResetPasswordService from "./services/request-reset-password.service";

@Module({
    providers: [RequestResetPasswordService],
    controllers: [ResetPasswordController],
})
export default class ResetPasswordModule {}