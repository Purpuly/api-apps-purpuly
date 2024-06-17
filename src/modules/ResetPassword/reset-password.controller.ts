import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";
import GetRequestDto from "./dto/get-request.dto";
import PostMutationDto from "./dto/post-mutation.dto";

// GET /api/:applicationId/reset-password/request?email=xxx
// POST /api/:applicationId/reset-password/mutation { recordId, resetPasswordToken, newPassword }

@Controller()
export default class ResetPasswordController {
    constructor(
        private readonly requestResetPasswordService: RequestResetPasswordService,
        private readonly mutationResetPasswordService: MutationResetPasswordService,
    ) { }

    @Get('/request')
    public async requestResetPassword(
        @Query() query: GetRequestDto,
    ) {
        return await this.requestResetPasswordService.handle(
            query.email,
        );
    }

    @Post('/mutation')
    public async mutationResetPassword(
        @Body() postMutationDto: PostMutationDto,
    ) {
        return await this.mutationResetPasswordService.handle(postMutationDto);
    }
}