import { Injectable } from "@nestjs/common";
import PasswordRepository from "@core/repositories/Authentication/Password.repository";
import DefaultPasswordPoliciesChecker from "@shared/utils/DefaultPasswordPoliciesChecker.utils";

@Injectable()
export default class PasswordRepositoryImplementation implements PasswordRepository {
    constructor() { }

    public async checkIfPasswordPassesPasswordPoliciesForApp(
        app_id: string,
        password: string,
    ): Promise<boolean> {
        return DefaultPasswordPoliciesChecker.check(password);
    }

    public async validateAndUpdatePasswordForApp(
        app_id: string,
        user_id: string,
        new_password: string,
    ): Promise<void> {

    }
}