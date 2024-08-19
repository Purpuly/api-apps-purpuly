import { createHmac } from "node:crypto";

/* 
    * This class is responsible for verifying the webhook signature.
    * It uses the HMAC algorithm to generate a signature based on the secret and the data.
    * The signature is then compared to the signature sent in the request.
    * If the signatures match, the webhook is considered valid.
    * We can use this class as a utility to verify webhooks on Node.js applications using Purpuly Services.
*/

export default class WebhookIngressUtils {
    private static HMAC_SIGNATURE_ALGORITHM: string = "sha256";
    private static HMAC_SIGNATURE_HEADER: string = "x-signature";

    public static verifyWebhookFromRequest(
        secret: string,
        body: any,
        headers: any,
    ): boolean {
        return WebhookIngressUtils.verifyWebhook(
            secret,
            body,
            headers[WebhookIngressUtils.HMAC_SIGNATURE_HEADER],
        );
    }

    private static verifyWebhook(
        secret: string,
        data: any,
        signature: string
    ): boolean {
        const expectedSignature: string =
            WebhookIngressUtils.createHMACSignature(secret, JSON.stringify(data));

        return String(signature) === String(expectedSignature);
    }

    private static createHMACSignature(
        secret: string,
        data: string
    ): string {
        return createHmac(
            WebhookIngressUtils.HMAC_SIGNATURE_ALGORITHM,
            secret
        ).update(data).digest("hex");
    }
}