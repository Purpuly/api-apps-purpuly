import { ConfigService } from "@nestjs/config";
import axios, { type AxiosInstance } from "axios";
import Core from "@core/services/core.service";
import { Injectable, Logger } from "@nestjs/common";
import type MailRepository from "@shared/repositories/Mail/Mail.repository";
import templatesMap from "@shared/repositories/Mail/constants/template-map.const";
import type TransactionalMailPayload from "@shared/repositories/Mail/transactional-mail.type";
import PublicApplication from "@shared/interfaces/public-application.type";

@Injectable()
export default class MailService extends Core implements MailRepository {
    private readonly mailHttpClient: AxiosInstance;

    private readonly MJ_APIKEY_PUBLIC: string =
        this.configService.getOrThrow<string>('MJ_APIKEY_PUBLIC');

    private readonly MJ_APIKEY_PRIVATE: string =
        this.configService.getOrThrow<string>('MJ_APIKEY_PRIVATE');

    private readonly MJ_API_BASE_URL: string = 'https://api.mailjet.com/v3.1/send';

    constructor(
        private readonly configService: ConfigService,
    ) {
        super();

        this.mailHttpClient = axios.create({
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
        resetPasswordToken: string,
        recordId: string = '',
        public_application: PublicApplication,
    ): Promise<void> {
        const { appId, name } = public_application;

        const From = MailService.getMailFrom();
        const TemplateID = MailService.resolveTemplateId('reset-password');
        const resetLink = MailService.getResetPasswordLink(
            appId, resetPasswordToken, recordId
        );

        await this.sendTransactionalMail({
            From,
            To: [
                {
                    Name: to.name,
                    Email: to.email,
                },
            ],
            TemplateID,
            TemplateLanguage: true,
            Variables: {
                applicationName: `${name}`,
                email: to.email,
                link: resetLink,
            },
            Subject: `Changer de mot de passe sur ${name}`,
        });
    }

    public async sendTransactionalMail(
        data: TransactionalMailPayload
    ): Promise<void> {
        await this.mailHttpClient.post(this.MJ_API_BASE_URL, { Messages: [data] });
    }

    private static resolveTemplateId(template: string): number {
        const id = templatesMap[template];

        if (!id) {
            Logger.error(`MailService: Template ${template} not found, check the template map !`);
            throw new Error(`MailService: Template ${template} not found, check the template map !`);
        }

        return id;
    };

    private static getMailFrom(): TransactionalMailPayload['From'] {
        return {
            Email: 'no-reply@apps.purpuly.com',
            Name: 'Purpuly Apps',
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
            `http://localhost:5173/app/${app_id}/reset-password?token=${resetPasswordToken}&record_id=${recordId}`;

        return url;
    }
}