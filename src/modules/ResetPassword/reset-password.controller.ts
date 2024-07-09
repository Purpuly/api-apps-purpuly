import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import RequestResetPasswordService from "./services/request-reset-password.service";
import MutationResetPasswordService from "./services/mutation-reset-password.service";
import GetRequestDto from "./dto/post-request.dto";
import PostMutationDto from "./dto/post-mutation.dto";
import successCodes from "@shared/success/success-codes";

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
            code: successCodes.resetPassword.request,
        };
    }

    @Post('/mutation')
    @HttpCode(200)
    public async mutationResetPassword(
        @Body() postMutationDto: PostMutationDto,
    ) {
        await this.mutationResetPasswordService.handle(postMutationDto);

        return {
            code: successCodes.resetPassword.mutation,
        };
    }
}