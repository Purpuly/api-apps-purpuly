import { createHmac } from "node:crypto";
import axios, { AxiosInstance } from "axios";

export default class WebhookEgressUtils {
    private static HMAC_SIGNATURE_ALGORITHM: string = "sha256";
    private static HMAC_SIGNATURE_HEADER: string = "x-signature";
    private static WEBHOOK_EGRESS_UA: string = "purpuly-webhook-egress/1.0";

    private static baseWebhookEgressInstance: AxiosInstance = axios.create({
        headers: {
            "Content-Type": "application/json",
            "X-Powered-By": "Purpuly Services",
            "User-Agent": WebhookEgressUtils.WEBHOOK_EGRESS_UA,
        },
    });

    public static async triggerWebhook(
        url: string,
        secret: string,
        data: any
    ): Promise<void> {
        const signature: string =
            WebhookEgressUtils.createHMACSignature(secret, JSON.stringify(data));

        await WebhookEgressUtils.baseWebhookEgressInstance.post(url, data, {
            headers: {
                [WebhookEgressUtils.HMAC_SIGNATURE_HEADER]: signature,
            },
        });
    }

    private static createHMACSignature(
        secret: string,
        data: string
    ): string {
        return createHmac(WebhookEgressUtils.HMAC_SIGNATURE_ALGORITHM, secret).update(data).digest("hex");
    }
}