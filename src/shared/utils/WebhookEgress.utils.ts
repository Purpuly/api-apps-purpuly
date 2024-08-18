import { createHmac } from "node:crypto";
import axios, { AxiosInstance } from "axios";

const HMAC_SIGNATURE_ALGORITHM: string = "sha256";
const HMAC_SIGNATURE_HEADER: string = "X-Signature";
const WEBHOOK_EGRESS_UA: string = "purpuly-webhook-egress/1.0";

const baseWebhookEgressInstance: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        "X-Powered-By": "Purpuly Services",
        "User-Agent": WEBHOOK_EGRESS_UA,
    },
});

export default class WebhookEgressUtils {
    public static async triggerWebhook(
        url: string,
        secret: string,
        data: any
    ): Promise<void> {
        const signature: string =
            WebhookEgressUtils.createHMACSignature(secret, JSON.stringify(data));

        await baseWebhookEgressInstance.post(url, data, {
            headers: {
                [HMAC_SIGNATURE_HEADER]: signature,
            },
        });
    }

    private static createHMACSignature(
        secret: string,
        data: string
    ): string {
        return createHmac(HMAC_SIGNATURE_ALGORITHM, secret).update(data).digest("hex");
    }
}