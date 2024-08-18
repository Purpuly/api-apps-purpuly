import { HttpException, Injectable } from "@nestjs/common";
import WebhookPasswordServiceRepository from "@core/repositories/Webhook/WebhookPassword.repository";
import UserPasswordUpdatePayload from "@shared/interfaces/user-password-update-payload.type";
import AESEncryptionUtils from "@shared/utils/AESEncryption.utils";
import WebhookEgressUtils from "@shared/utils/WebhookEgress.utils";

@Injectable()
export default class WebhookPasswordService implements WebhookPasswordServiceRepository {
    public async triggerPasswordUpdateWebhook(
        url: string,
        secret: string,
        payload: UserPasswordUpdatePayload,
    ): Promise<void> {
        await WebhookEgressUtils.triggerWebhook(url, secret, payload);
    }

    public preparePayload(
        user_id: string,
        password: string,
        secret: string,
    ): UserPasswordUpdatePayload {
        try {
            const encrypted_password: string = AESEncryptionUtils.encrypt(password, secret);

            return {
                user_id,
                password: encrypted_password,
            };
        } catch (error) {
            console.error("Error preparing payload", error);
            throw new HttpException(
                "Unexpected error appeared in the process of preparing the communication with application services. We aborted the operation to prevent data corruption.",
                500,
            );
        }
    };
}
