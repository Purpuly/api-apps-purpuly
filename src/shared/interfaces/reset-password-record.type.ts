type ResetPasswordRecord = {
    recordId: string;
    userId: string;
    appId: string;
    resetPasswordToken: string;
    isExpired: boolean;
};

export default ResetPasswordRecord;