const DEFAULT_PASSWORD_MIN_LENGTH: number = 6;
const DEFAULT_PASSWORD_MAX_LENGTH: number = 64;
const DEFAULT_PASSWORD_REGEX: string = `^.{${DEFAULT_PASSWORD_MIN_LENGTH},${DEFAULT_PASSWORD_MAX_LENGTH}}$`;

export default class DefaultPasswordPoliciesChecker {
    public static check(password: string): boolean {
        const defaultRegex = new RegExp(DEFAULT_PASSWORD_REGEX);

        if (!defaultRegex.test(password)) {
            return false;
        }

        return true;
    }
}