import ResetPasswordRepository from "@core/repositories/Authentication/ResetPassword.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class ResetPasswordRepositoryImplementation implements ResetPasswordRepository {
    constructor() { }

    public async checkIfResetPasswordTokenIsValidAndNotExpired(app_id: string, request_id: string, token: string): Promise<boolean> {
        return false;
    }

    async getApplicationUserIdFromRequestIdAndResetPasswordToken(app_id: string, request_id: string, token: string): Promise<string> {
        return 'application_user_id';
    }

    async saveResetPasswordTokenForApp(app_id: string, user_id: string, token: string): Promise<boolean> {
        return false;
    }

    async invalidateResetPasswordTokenForApp(app_id: string, request_id: string): Promise<{ success: boolean; invalidated_token: string; }> {
        return { success: false, invalidated_token: 'invalidated_token' };
    }
}