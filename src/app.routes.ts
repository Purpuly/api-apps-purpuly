import { Routes } from "@nestjs/core";
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
                        path: "reset-password",
                        module: ResetPasswordModule,
                    },
                ],
            },
        ],
    },
];

export default routes;