import { Routes } from "@nestjs/core";
import SecurityModule from "./modules/Security/security.module";
import ResetPasswordModule from "./modules/ResetPassword/reset-password.module";
import ApplicationModule from "@shared/modules/app/application.module";

const routes: Routes = [
    {
        path: "api",
        children: [
            {
                path: ":applicationId",
                module: ApplicationModule,
                children: [
                    {
                        path: "security",
                        module: SecurityModule,
                    },
                    {
                        path: "reset-password",
                        module: ResetPasswordModule,
                    },
                ],
            },
        ],
    },
];

export default routes;