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
    },
];

export default applications;