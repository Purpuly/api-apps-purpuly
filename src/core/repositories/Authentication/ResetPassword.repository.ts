import type ResetPasswordRecord from "@shared/interfaces/reset-password-record.type";

export default abstract class ResetPasswordRepository {
    abstract getResetPasswordRecordFromRecordId(record_id: string): Promise<ResetPasswordRecord | null>;
    abstract checkIfResetPasswordTokenIsValidAndNotExpired(record: ResetPasswordRecord): Promise<boolean>;
    abstract invalidateResetPasswordToken(record: ResetPasswordRecord): Promise<{ success: boolean, invalidated_token: string }>;
    abstract saveResetPasswordTokenForApp(app_id: string, user_id: string, token: string): Promise<boolean>;
}