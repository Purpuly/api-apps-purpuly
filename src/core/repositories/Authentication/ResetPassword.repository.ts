export default abstract class ResetPasswordRepository {
    abstract checkIfResetPasswordTokenIsValidAndNotExpired(app_id: string, request_id: string, token: string): Promise<boolean>;
    abstract getApplicationUserIdFromRequestIdAndResetPasswordToken(app_id: string, request_id: string, token: string): Promise<string>;
    abstract invalidateResetPasswordTokenForApp(app_id: string, request_id: string): Promise<{ success: boolean, invalidated_token: string }>;
    abstract saveResetPasswordTokenForApp(app_id: string, user_id: string, token: string): Promise<boolean>;
}