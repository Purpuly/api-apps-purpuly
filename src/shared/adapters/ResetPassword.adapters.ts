import type { ResetPassword } from "@prisma/client";
import type ResetPasswordRecord from "@shared/interfaces/reset-password-record.type";

const DEFAULT_RESET_PASSWORD_EXPIRATION_TIME_IN_MINUTES: number = 15; // 15 minutes

export default class ResetPasswordAdapters {
    public static fromResetPasswordToResetPasswordRecord(
        reset_password: ResetPassword
    ): ResetPasswordRecord {
        return {
            recordId: reset_password.id,
            userId: reset_password.user_id,
            appId: reset_password.app_id,
            resetPasswordToken: reset_password.token,
            isExpired: ResetPasswordAdapters.checkIfIsExpired(reset_password.iat),
        };
    }

    private static checkIfIsExpired(
        timestamp: bigint,
        expirationTimeInMinutes: number = DEFAULT_RESET_PASSWORD_EXPIRATION_TIME_IN_MINUTES
    ): boolean {
        const now = Date.now();

        const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;

        return Number(now) >= Number(timestamp) + expirationTimeInMilliseconds;
    }
}