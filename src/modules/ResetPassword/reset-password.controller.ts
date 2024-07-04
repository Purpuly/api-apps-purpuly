import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";
import GetRequestDto from "./dto/post-request.dto";
import PostMutationDto from "./dto/post-mutation.dto";

// GET /api/:applicationId/reset-password/request { email }
// POST /api/:applicationId/reset-password/mutation { recordId, resetPasswordToken, newPassword }

@Controller()
export default class ResetPasswordController {
    constructor(
        private readonly requestResetPasswordService: RequestResetPasswordService,
        private readonly mutationResetPasswordService: MutationResetPasswordService,
    ) { }

    @Post('/request')
    @HttpCode(200)
    public async requestResetPassword(
        @Body() postRequestDto: GetRequestDto,
    ) {
        await this.requestResetPasswordService.handle(
            postRequestDto.email,
        );

        return {
            message: 'Reset password request has been sent',
        };
    }

    @Post('/mutation')
    @HttpCode(200)
    public async mutationResetPassword(
        @Body() postMutationDto: PostMutationDto,
    ) {
        await this.mutationResetPasswordService.handle(postMutationDto);

        return {
            message: 'Password has been reset successfully',
        };
    }
}