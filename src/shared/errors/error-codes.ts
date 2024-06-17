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
        mutation: {
            passwordNotSatifiesPolicies: 'reset-password/mutation/password-not-satisfies-policies',
            invalidToken: 'mutation/invalid-token',
            failedToUpdate: 'mutation/failed-to-update',
            failedToInvalidate: 'mutation/failed-to-invalidate',
            invalidTokenMatchOnInvalidation: 'mutation/invalid-token-match-on-invalidation',
        },
    },
};

export default errorCodes;