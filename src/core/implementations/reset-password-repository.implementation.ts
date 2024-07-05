import { Injectable } from "@nestjs/common";
import type ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import ResetPasswordRecord from "@shared/interfaces/reset-password-record.type";
import DatabaseService from "@shared/modules/database/database.service";
import ResetPasswordAdapters from "@shared/adapters/ResetPassword.adapters";

@Injectable()
export default class ResetPasswordRepositoryImplementation implements ResetPasswordRepository {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    public async getResetPasswordRecordFromRecordId(
        recordId: string
    ): Promise<ResetPasswordRecord | null> {
        try {
            const resetPasswordRecord = await this.databaseService.resetPassword.findUnique({
                where: {
                    id: recordId
                }
            });

            if (!resetPasswordRecord) return null;

            return ResetPasswordAdapters
                .fromResetPasswordToResetPasswordRecord(resetPasswordRecord);
        } catch (error) {
            return null;
        }
    }

    public async checkIfResetPasswordTokenIsValidAndNotExpired(
        record: ResetPasswordRecord
    ): Promise<boolean> {
        try {
            const resetPasswordRecord = await this.databaseService.resetPassword.findUnique({
                where: {
                    id: record.recordId
                }
            });

            if (!resetPasswordRecord) return false;

            return true;
        } catch (error) {
            return false;
        }
    }

    public async invalidateResetPasswordToken(
        record: ResetPasswordRecord
    ): Promise<{ success: boolean, invalidated_token: string }> {
        try {
            await this.databaseService.resetPassword.delete({
                where: {
                    id: record.recordId
                }
            });

            return {
                success: true,
                invalidated_token: record.resetPasswordToken
            };
        } catch (error) {
            return {
                success: false,
                invalidated_token: record.resetPasswordToken
            };
        }
    }

    public async saveResetPasswordTokenForApp(
        appId: string,
        userId: string,
        token: string
    ): Promise<string> {
        const currentTimestamp = Date.now();

        const record = await this.databaseService.resetPassword.create({
            data: {
                app_id: appId,
                user_id: userId,
                token: token,
                iat: currentTimestamp,
            }
        });

        return record.id;
    }
}