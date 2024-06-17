import { REQUEST } from "@nestjs/core";
import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import PostMutationDto from "../dto/post-mutation.dto";
import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import PasswordRepository from "@core/repositories/Authentication/Password.repository";
import errorCodes from "@shared/errors/error-codes";

@Injectable()
export default class MutationResetPasswordService {
    private readonly applicationId: string;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly passwordRepository: PasswordRepository,
        private readonly resetPasswordRepository: ResetPasswordRepository,
    ) {
        this.applicationId = this.request['applicationId'];
    }

    public async handle(
        postMutationDto: PostMutationDto,
    ): Promise<void> {
        const applicationId: string = this.applicationId;

        const { recordId, resetPasswordToken, newPassword } = postMutationDto;

        await this.checkIfResetPasswordTokenIsValid(applicationId, recordId, resetPasswordToken);

        const userId = await this.resetPasswordRepository.getApplicationUserIdFromRequestIdAndResetPasswordToken(
            applicationId,
            recordId,
            resetPasswordToken,
        );

        if (!userId) {
            throw new HttpException(errorCodes.user.notFound, 404);
        }

        await this.validatePassword(applicationId, newPassword);

        await this.updatePassword(applicationId, userId, newPassword);

        await this.invalidateResetPasswordToken(applicationId, recordId, resetPasswordToken);

        return;
    }

    private async checkIfResetPasswordTokenIsValid(
        applicationId: string,
        requestId: string,
        token: string,
    ): Promise<void> {
        const isValidToken = await this.resetPasswordRepository.checkIfResetPasswordTokenIsValidAndNotExpired(
            applicationId,
            requestId,
            token,
        );

        if (!isValidToken) {
            throw new HttpException(errorCodes.resetPassword.mutation.invalidToken, 400);
        }
    }

    private async validatePassword(
        applicationId: string,
        newPassword: string,
    ): Promise<void> {
        const passwordPassesPolicies = await this.passwordRepository.checkIfPasswordPassesPasswordPoliciesForApp(
            applicationId,
            newPassword,
        );

        if (!passwordPassesPolicies) {
            throw new HttpException(errorCodes.resetPassword.mutation.passwordNotSatifiesPolicies, 400);
        }
    }

    private async updatePassword(
        applicationId: string,
        userId: string,
        newPassword: string,
    ): Promise<void> {
        await this.passwordRepository.validateAndUpdatePasswordForApp(
            applicationId,
            userId,
            newPassword,
        );
    }

    private async invalidateResetPasswordToken(
        applicationId: string,
        requestId: string,
        token: string,
    ): Promise<void> {
        const { invalidated_token, success } = await this.resetPasswordRepository.invalidateResetPasswordTokenForApp(
            applicationId,
            requestId,
        );

        if (!success) {
            throw new HttpException(errorCodes.resetPassword.mutation.failedToInvalidate, 500);
        }

        if (invalidated_token !== token) {
            Logger.error(`Invalid token match on invalidation for app ${applicationId} and request ${requestId}`);
            throw new HttpException(errorCodes.resetPassword.mutation.invalidTokenMatchOnInvalidation, 400);
        }
    }
}