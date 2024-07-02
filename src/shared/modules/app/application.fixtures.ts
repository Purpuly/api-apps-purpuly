import { Application } from "@prisma/client";

const applications: Application[] = [
    {
        id: "test_id",
        name: "Test Application",
        description: "This is a test application",
        image_url: "https://example.com/logo.png",
        url: "https://example.com",
        created_at: new Date(),
        isActive: true,
        status: "approved",
    },
];

export default applications;