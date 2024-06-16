import UserAccountStatus from "@shared/interfaces/user-account-status.type";
import UserRecord from "@shared/interfaces/user-record.type";

export default abstract class UserRepository {
    abstract getUserIdFromUserEmail(email: string): Promise<string | null>;
    abstract getUserRecordFromUserId(user_id: string): Promise<UserRecord | null>;
    abstract getUserAccountStatus(user_id: string): Promise<UserAccountStatus>;
}