import { randomBytes } from 'node:crypto';

const DEFAULT_STRING_LENGTH: number = 32;

export default class RandomString {
    public static generate(
        string_length: number = DEFAULT_STRING_LENGTH
    ): string {
        return randomBytes(string_length).toString('hex');
    }
}