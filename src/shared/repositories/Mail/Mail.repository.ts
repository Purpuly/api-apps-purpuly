import type PublicApplication from "@shared/interfaces/public-application.type";
import type TransactionalMailPayload from "./transactional-mail.type";

export default abstract class MailRepository {
    abstract sendResetPasswordMail(
        to: { name: string, email: string },
        resetPasswordToken: string,
        recordId: string,
        public_application: PublicApplication,
    ): Promise<void>;
    abstract sendTransactionalMail(data: TransactionalMailPayload): Promise<void>;
}