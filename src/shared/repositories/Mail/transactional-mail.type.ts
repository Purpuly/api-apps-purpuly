type BaseMailSenderPayload = {
    from: {
        name: string;
        email: string;
    };
    to: {
        name: string;
        email: string;
    }[];
    subject: string;
};

type TransactionalMailPayload = BaseMailSenderPayload & {
    templateId: string;
    variables: any;
};

export default TransactionalMailPayload;
