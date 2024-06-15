abstract class ResetPasswordRepository {
    abstract createResetPasswordToken(userId: string): Promise<{ token: string }>;
    abstract checkTokenValidityUser(userId: string, token: string): Promise<boolean>;
    abstract updatePassword(userId: string, password: string): Promise<void>;
    abstract deleteResetPasswordToken(userId: string): Promise<void>;
}

export default ResetPasswordRepository;