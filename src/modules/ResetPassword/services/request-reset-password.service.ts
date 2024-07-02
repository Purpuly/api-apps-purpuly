import { REQUEST } from "@nestjs/core";
import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import UserRepository from "@core/repositories/Authentication/User.repository";
import errorCodes from "@shared/errors/error-codes";
import RandomString from "@shared/utils/RandomString.utils";
import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import MailRepository from "@shared/repositories/Mail/Mail.repository";

const RESET_PASSWORD_TOKEN_LENGTH: number = 64;

@Injectable()
export default class RequestResetPasswordService {
    private readonly applicationId: string;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly mailRepository: MailRepository,
        private readonly userRepository: UserRepository,
        private readonly resetPasswordRepository: ResetPasswordRepository,
    ) {
        this.applicationId = this.request['applicationId'];
    }

    public async handle(
        user_email: string,
    ): Promise<any> {
        const app_id = this.applicationId;

        const userId: string | null =
            await this.userRepository.getUserIdFromUserEmail(user_email);

        if (userId === null) {
            throw new HttpException(errorCodes.resetPassword.request.userNotFound, 404);
        }

        const userRecord =
            await this.userRepository.getUserRecordFromUserId(userId);

        if (userRecord === null) {
            throw new HttpException(errorCodes.resetPassword.request.userNotFound, 404);
        }

        await this.checkIfTheUserIsAbleToRequestResetPassword(userId);

        const resetPasswordToken: string = this.generateResetPasswordToken();

        await this.saveResetPasswordTokenInDatabase(
            app_id,
            userId,
            resetPasswordToken,
        );

        await this.mailRepository.sendResetPasswordMail(
            {
                name: user_email,
                email: user_email,
            },
            app_id,
            resetPasswordToken,
        );
    }

    private async checkIfTheUserIsAbleToRequestResetPassword(
        user_id: string,
    ): Promise<void> {
        const userAccountStatus = await this.userRepository.getUserAccountStatus(user_id);

        if (!userAccountStatus.accountEmailIsVerified) {
            throw new HttpException(errorCodes.user.notVerifiedEmail, 400);
        }

        if (userAccountStatus.accountIsEnabled) {
            throw new HttpException(errorCodes.user.notActive, 400);
        }

        if (userAccountStatus.exposedToUsageRestrictions) {
            throw new HttpException(errorCodes.user.usageRestrictions, 400);
        }
    }

    private generateResetPasswordToken(): string {
        try {
            return RandomString.generate(RESET_PASSWORD_TOKEN_LENGTH);
        } catch (error) {
            Logger.error('Error while generating reset password token !', typeof error === 'string' ? error : error.message);
            throw new HttpException('INTERNAL_SERVER_ERROR', 500);
        }
    }

    private async saveResetPasswordTokenInDatabase(
        app_id: string,
        user_id: string,
        resetPasswordToken: string,
    ): Promise<void> {
        if (!app_id || !user_id || !resetPasswordToken) {
            Logger.error('Missing parameters on saving reset password token in database operation ! Check the parameters passed to the function.');
            throw new HttpException('INTERNAL_SERVER_ERROR', 500);
        }

        await this.resetPasswordRepository.saveResetPasswordTokenForApp(
            app_id,
            user_id,
            resetPasswordToken,
        );
    }
}