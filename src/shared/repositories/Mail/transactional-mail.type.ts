type BaseMailSenderPayload = {
    From: {
        Name: string;
        Email: string;
    };
    To: {
        Name: string;
        Email: string;
    }[];
    Subject: string;
};

type TransactionalMailPayload = BaseMailSenderPayload & {
    TemplateID: number;
    Variables: any;
    TemplateLanguage: boolean;
};

export default TransactionalMailPayload;
