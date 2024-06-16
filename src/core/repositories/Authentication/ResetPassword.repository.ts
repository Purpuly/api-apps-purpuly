export default abstract class ResetPasswordRepository {
    abstract checkIfResetPasswordTokenIsValid(app_id: string, user_id: string, token: string): Promise<boolean>;
    abstract invalidateResetPasswordTokenForApp(app_id: string, user_id: string): Promise<{ success: boolean, invalidated_token: string }>;
    abstract saveResetPasswordTokenForApp(app_id: string, user_id: string, token: string): Promise<boolean>;
}