import { Application } from "@prisma/client";

const applications: Application[] = [
    {
        id: "test_id",
        name: "Admin Magic Hands",
        description: "Plateforme de gestion des rendez-vous de Magic Hands",
        image_url: "https://magichands-massage.fr/apple-icon.png",
        url: "https://admin.magichands-massage.fr",
        created_at: new Date(),
        is_active: true,
        status: "approved",
        security_webhook_is_enabled: true,
        security_webhook_secret: "secret",
        security_webhook_url: "http://localhost:3000",
    },
];

export default applications;