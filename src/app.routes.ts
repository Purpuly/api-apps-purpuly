import { Routes } from "@nestjs/core";
import ResetPasswordModule from "./modules/ResetPassword/reset-password.module";

const routes: Routes = [
    {
        path: "api",
        children: [
            {
                path: ":applicationId",
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