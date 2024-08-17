import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const IV_LENGTH: number = 16;
const AES_ALGORITHM: string = "aes-256-cbc";

export default class AESEncryptionUtils {
    public static encrypt(data: string, secret: string): string {
        const iv: Buffer = randomBytes(IV_LENGTH);
        const cipher = createCipheriv(AES_ALGORITHM, secret, iv);

        let encrypted = cipher.update(data, "utf-8", "hex");
        encrypted += cipher.final("hex");

        return `${iv.toString("hex")}:${encrypted}`;
    }

    public static decrypt(data: string, secret: string): string {
        const [iv, encryptedData] = data.split(":");
        const decipher = createDecipheriv(AES_ALGORITHM, secret, Buffer.from(iv, "hex"));

        let decrypted = decipher.update(encryptedData, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        return decrypted;
    }
}