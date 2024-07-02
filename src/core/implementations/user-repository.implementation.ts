import { Injectable } from "@nestjs/common";
import UserRecord from "@shared/interfaces/user-record.type";
import type UserRepository from "@core/repositories/Authentication/User.repository";
import UserAccountStatus from "@shared/interfaces/user-account-status.type";

@Injectable()
export default class UserRepositoryImplementation implements UserRepository {
    constructor() { }

    public async getUserIdFromUserEmail(email: string): Promise<string | null> {
        return null;
    }

    public async getUserRecordFromUserId(user_id: string): Promise<UserRecord | null> {
        return null;
    }

    public async getUserAccountStatus(user_id: string): Promise<UserAccountStatus> {
        return null;
    }
}