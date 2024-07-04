import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import { Injectable } from "@nestjs/common";
import ResetPasswordRecord from "@shared/interfaces/reset-password-record.type";

@Injectable()
export default class ResetPasswordRepositoryImplementation implements ResetPasswordRepository {
    constructor() { }

    public async getResetPasswordRecordFromRecordId(
        recordId: string
    ): Promise<ResetPasswordRecord | null> {
        return null;
    }

    public async checkIfResetPasswordTokenIsValidAndNotExpired(
        record: ResetPasswordRecord
    ): Promise<boolean> {
        return;
    }

    public async invalidateResetPasswordToken(
        record: ResetPasswordRecord
    ): Promise<{ success: boolean, invalidated_token: string }> {
        return;
    }

    public async saveResetPasswordTokenForApp(
        appId: string,
        userId: string,
        token: string
    ): Promise<boolean> {
        return;
    }
}