import axios, { type AxiosInstance } from "axios";
import Core from "@core/services/core.service";
import { Injectable, Logger } from "@nestjs/common";
import type MailRepository from "@shared/repositories/Mail/Mail.repository";
import templatesMap from "@shared/repositories/Mail/constants/template-map.const";
import type TransactionalMailPayload from "@shared/repositories/Mail/transactional-mail.type";

@Injectable()
export default class MailService extends Core implements MailRepository {
    private readonly mailHttpClient: AxiosInstance;
    private readonly MJ_APIKEY_PUBLIC: string;
    private readonly MJ_APIKEY_PRIVATE: string;

    constructor() {
        super();

        this.MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC || '';
        this.MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE || '';

        this.mailHttpClient = axios.create({
            url: 'https://api.mailjet.com/v3/send',
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: this.MJ_APIKEY_PUBLIC,
                password: this.MJ_APIKEY_PRIVATE,
            },
        });
    }

    public async sendResetPasswordMail(
        to: { name: string; email: string; },
        app_id: string,
        resetPasswordToken: string
    ): Promise<void> {
        const from = MailService.getMailFrom();
        const templateId = MailService.resolveTemplateId('reset-password');
        const resetLink = MailService.getResetPasswordLink(app_id, resetPasswordToken);

        await this.sendTransactionalMail({
            to: [
                {
                    name: to.name,
                    email: to.email,
                },
            ],
            from,
            templateId,
            variables: {
                application_name: 'Purpuly App',
                email: to.email,
                link: resetLink,
            },
            subject: 'Réinitialisation du mot de passe',
        });
    }

    public async sendTransactionalMail(data: TransactionalMailPayload): Promise<void> {
        console.log('MailService: Sending mail with data: ', data);
        await this.mailHttpClient.post('', data);
    }

    private static resolveTemplateId(template: string): string {
        const id = templatesMap[template];

        if (!id) {
            Logger.error(`MailService: Template ${template} not found, check the template map !`);
            throw new Error(`MailService: Template ${template} not found, check the template map !`);
        }

        return id;
    };

    private static getMailFrom(): TransactionalMailPayload['from'] {
        return {
            email: 'no-reply@purpuly.com',
            name: 'Purpuly',
        };
    }

    // TODO : Improve this method the complete URL with a better way !
    private static getResetPasswordLink(
        app_id: string,
        resetPasswordToken: string = '',
        recordId: string = ''
    ): string {
        const isProductionEnv: boolean = Core.isProductionEnv;

        const url = isProductionEnv
            ? `https://apps.purpuly.com/app/${app_id}/reset-password?token=${resetPasswordToken}&record_id=${recordId}` :
            `http://localhost:3000/app/${app_id}/reset-password?token=${resetPasswordToken}&record_id=${recordId}`;

        return url;
    }
}