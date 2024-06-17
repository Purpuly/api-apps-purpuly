export default abstract class PasswordRepository {
    abstract checkIfPasswordPassesPasswordPoliciesForApp(app_id: string, password: string): Promise<boolean>;
    abstract validateAndUpdatePasswordForApp(app_id: string, user_id: string, new_password: string): Promise<void>;
}