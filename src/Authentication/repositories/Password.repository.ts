export default abstract class PasswordRepository {
    abstract checkIfPasswordPassesPasswordPolicies(password: string): Promise<boolean>;
    abstract validateAndUpdatePassword(user_id: string, new_password: string): Promise<void>;
}