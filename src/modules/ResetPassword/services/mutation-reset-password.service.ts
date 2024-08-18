import { REQUEST } from "@nestjs/core";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import PostMutationDto from "../dto/post-mutation.dto";
import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import PasswordRepository from "@core/repositories/Authentication/Password.repository";
import errorCodes from "@shared/errors/error-codes";
import ResetPasswordRecord from "@shared/interfaces/reset-password-record.type";
import ApplicationRepository from "@shared/repositories/Application/Application.repository";
import ApplicationWebhookPrivate from "@shared/interfaces/application-webhook-private.type";
import ApplicationAdapter from "@shared/adapters/Application.adapter";
import WebhookPasswordService from "./webhook-password.service";
import UserPasswordUpdatePayload from "@shared/interfaces/user-password-update-payload.type";

@Injectable()
export default class MutationResetPasswordService {
    private readonly applicationId: string;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly passwordRepository: PasswordRepository,
        private readonly resetPasswordRepository: ResetPasswordRepository,
        private readonly applicationRepository: ApplicationRepository,
        private readonly webhookPasswordService: WebhookPasswordService,
    ) {
        this.applicationId = this.request['applicationId'];
    }

    public async handle(
        postMutationDto: PostMutationDto,
    ): Promise<void> {
        const applicationId: string = this.applicationId;

        const { recordId, newPassword, resetPasswordToken } = postMutationDto;

        const record: ResetPasswordRecord =
            await this.getResetPasswordRecord(recordId);

        await this.checkIfResetPasswordTokenIsValid(record, resetPasswordToken);

        await this.validatePassword(applicationId, newPassword);

        await this.invalidateResetPasswordToken(record);

        await this.updatePassword(
            applicationId,
            record.userId,
            newPassword,
        );
    }

    private async getResetPasswordRecord(
        recordId: string,
    ): Promise<ResetPasswordRecord> {
        const record: ResetPasswordRecord | null = await this.resetPasswordRepository.getResetPasswordRecordFromRecordId(
            recordId,
        );

        if (!record) {
            throw new HttpException(
                errorCodes.resetPassword.mutation.recordNotFound,
                404
            );
        }

        return record;
    }

    private async checkIfResetPasswordTokenIsValid(
        record: ResetPasswordRecord,
        token: string,
    ): Promise<void> {
        if (record.isExpired) {
            throw new HttpException(errorCodes.resetPassword.mutation.expiredToken, 400);
        }

        if (record.resetPasswordToken !== token) {
            throw new HttpException(errorCodes.resetPassword.mutation.invalidToken, 400);
        }

        if (record.appId !== this.applicationId) {
            throw new HttpException(errorCodes.resetPassword.mutation.applicationIdMismatch, 400);
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

        await this.useWebhookPasswordService(
            applicationId,
            userId,
            newPassword,
        );

        return;
    }

    private async useWebhookPasswordService(
        applicationId: string,
        userId: string,
        newPassword: string
    ): Promise<void> {
        const applicationWebhookPrivate: ApplicationWebhookPrivate = await this.getApplicationWebhookPrivate(
            applicationId,
        );

        if (!applicationWebhookPrivate.security_webhook_is_enabled) {
            // No need to trigger the webhook, feature is disabled
            return;
        }

        // Prepare payload
        const payload: UserPasswordUpdatePayload = this.webhookPasswordService.preparePayload(
            userId,
            newPassword,
            applicationWebhookPrivate.security_webhook_secret,
        );

        try {
            // Trigger webhook
            await this.webhookPasswordService.triggerPasswordUpdateWebhook(
                applicationWebhookPrivate.security_webhook_url,
                applicationWebhookPrivate.security_webhook_secret,
                payload,
            );
        } catch {
            throw new HttpException(errorCodes.resetPassword.mutation.failedToTriggerWebhook, 500);
        }
    }

    private async invalidateResetPasswordToken(
        record: ResetPasswordRecord,
    ): Promise<void> {
        const { invalidated_token, success } =
            await this.resetPasswordRepository.invalidateResetPasswordToken(
                record,
            );

        if (!success) {
            throw new HttpException(errorCodes.resetPassword.mutation.failedToInvalidate, 500);
        }

        if (invalidated_token !== record.resetPasswordToken) {
            throw new HttpException(errorCodes.resetPassword.mutation.invalidTokenMatchOnInvalidation, 400);
        }

        return;
    }

    private async getApplicationWebhookPrivate(
        applicationId: string,
    ): Promise<ApplicationWebhookPrivate> {
        const application = await this.applicationRepository.getApplicationFromAppId(
            applicationId,
        );

        // We can safely assume that the application exists because we have already checked for it in the middleware
        return ApplicationAdapter.fromApplicationToApplicationWebhookPrivate(application);
    }
}