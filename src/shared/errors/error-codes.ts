const errorCodes = {
    user: {
        notFound: 'user/not-found',
        notActive: 'user/not-active',
        usageRestrictions: 'user/usage-restrictions',
        notVerifiedEmail: 'user/not-verified-email',
    },
    resetPassword: {
        request: {
            userNotFound: 'reset-password/request/user-not-found',
        },
    },
};

export default errorCodes;