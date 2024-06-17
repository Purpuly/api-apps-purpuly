import type TransactionalMailPayload from "./transactional-mail.type";

export default abstract class MailRepository {
    abstract sendResetPasswordMail(
        to: { name: string, email: string },
        app_id: string,
        resetPasswordToken: string
    ): Promise<void>;
    abstract sendTransactionalMail(data: TransactionalMailPayload): Promise<void>;
}