import UserRecord from "@shared/interfaces/user-record.type";

export default abstract class UserRepository {
    abstract getUserIdFromUserEmail(email: string): Promise<string>;
    abstract getUserRecordFromUserId(user_id: string): Promise<UserRecord>;
    abstract isUserEmailActive(email: string): Promise<boolean>;
    abstract userIsExposedToUsageRestrictions(user_id: string): Promise<boolean>;
}