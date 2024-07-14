import { ApplicationSecurity } from "@prisma/client";

const applicationSecurity: ApplicationSecurity[] = [
    {
        id: "security_test_id",
        app_id: "test_id",
        private_key: "test_private_key_TEST_ID",
        public_key: "test_public_key_TEST_ID",
        webhook_is_enabled: true,
        webhook_url: "https://google.com",
    },
];

export default applicationSecurity;