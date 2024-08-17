import UserPasswordUpdatePayload from "@shared/interfaces/user-password-update-payload.type";

export default abstract class WebhookPasswordServiceRepository {
    abstract preparePayload(
        user_id: string,
        password: string,
        secret: string,
    ): UserPasswordUpdatePayload;

    abstract triggerPasswordUpdateWebhook(
        url: string,
        secret: string,
        payload: UserPasswordUpdatePayload,
    ): Promise<void>;
}