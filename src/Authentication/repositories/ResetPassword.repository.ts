export default abstract class ResetPasswordRepository {
    abstract resetPasswordTokenIsValid(token: string): Promise<boolean>;
    abstract invalidateResetPasswordToken(token: string): Promise<{ success: boolean, invalidated_token: string }>;
    abstract generatePasswordResetToken(email: string): Promise<string>;
}