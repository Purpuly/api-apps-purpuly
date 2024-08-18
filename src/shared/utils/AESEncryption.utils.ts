import { HttpException, Logger } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

const DEFAULT_INITIAL_VECTOR_LENGTH: number = 16;
const IV_SEPARATOR: string = ":";
const AES_ALGORITHM: string = "aes-256-cbc";

export default class AESEncryptionUtils {
    public static encrypt(data: string, secret: string): string {
        try {
            const iv = randomBytes(DEFAULT_INITIAL_VECTOR_LENGTH);
            const cipher = createCipheriv(AES_ALGORITHM, secret, iv);

            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');

            const stringifiedIv = iv.toString('base64');

            return `${stringifiedIv}${IV_SEPARATOR}${encrypted}`;
        } catch (error) {
            Logger.error("AES encryption failed", error);
            throw new HttpException(
                "Encryption failed, aborting operation, we just prevented data corruption and send a notification to the development team to investigate the issue.",
                500
            );
        }
    }

    public static decrypt(data: string, secret: string): string {
        try {
            const [stringifiedIv, encrypted] = data.split(IV_SEPARATOR);

            const iv = Buffer.from(stringifiedIv, 'base64');
            const decipher = createDecipheriv(AES_ALGORITHM, secret, iv);

            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            Logger.error("AES decryption failed", error);
            throw new HttpException(
                "Decryption failed, aborting operation, we just prevented data corruption and send a notification to the development team to investigate the issue.",
                500
            );
        }
    }

    public static generate32BytesSha256KeyFromString(value: string): string {
        return createHash('sha256')
            .update(String(value))
            .digest('base64')
            .substring(0, 32);
    }
}