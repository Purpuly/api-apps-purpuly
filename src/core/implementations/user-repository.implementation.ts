import { Injectable } from "@nestjs/common";
import UserRecord from "@shared/interfaces/user-record.type";
import type UserRepository from "@core/repositories/Authentication/User.repository";
import UserAccountStatus from "@shared/interfaces/user-account-status.type";
import FirebaseService from "@shared/services/firebase.service";

@Injectable()
export default class UserRepositoryImplementation implements UserRepository {
    constructor(
        private readonly firebaseService: FirebaseService,
    ) { }

    public async getUserIdFromUserEmail(email: string): Promise<string | null> {
        const user = await this.firebaseService.auth.getUserByEmail(email);

        if (!user) return null;

        return user.uid;
    }

    public async getUserRecordFromUserId(user_id: string): Promise<UserRecord | null> {
        const user = await this.firebaseService.auth.getUser(user_id);

        if (!user) return null;

        return user;
    }

    public async getUserAccountStatus(user_id: string): Promise<UserAccountStatus> {
        const user = await this.firebaseService.auth.getUser(user_id);

        if (!user) return null;

        const userAccountStatus: UserAccountStatus = {
            accountEmailIsVerified: user.emailVerified,
            accountIsEnabled: !user.disabled,
            exposedToUsageRestrictions: false,
        };

        return userAccountStatus;
    }

    public async validateVerifiedEmailStatus(user_id: string): Promise<void> {
        const user = await this.firebaseService.auth.getUser(user_id);

        if (!user) return;

        return;
    }
}