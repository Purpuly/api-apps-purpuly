import { Injectable } from '@nestjs/common';
import Core from '@core/services/core.service';
import { type App, initializeApp, cert } from 'firebase-admin/app';
import { type Auth, getAuth } from 'firebase-admin/auth';
import type UserRecord from '@shared/interfaces/user-record.type';

@Injectable()
export default class FirebaseService extends Core {
    private app: App;
    public auth: Auth;

    constructor() {
        super();

        this.app = this.init();
        this.auth = getAuth(this.app);
    }

    private init() {
        const serviceAccountPath = this.getServiceAccountPath();

        return initializeApp({
            credential: cert(serviceAccountPath),
        });
    }

    public getUser(userId: string): Promise<UserRecord> {
        return this.auth.getUser(userId);
    }

    private getServiceAccountPath(): string {
        return FirebaseService.isProductionEnv
            ? '/app/credentials/gcp_credentials.json'
            : './credentials/gcp_credentials.json';
    }
}
