import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "@shared/modules/database/database.module";
import ResetPasswordModule from "./modules/ResetPassword/reset-password.module";
import ApplicationMiddleware from "@core/middlewares/Application.middleware";
import ApplicationModule from "@shared/modules/app/application.module";
import SecurityModule from "./modules/Security/security.module";

@Module({
    imports: [
        ApplicationModule,
        DatabaseModule,
        SecurityModule,
        ResetPasswordModule,
    ],
})
export default class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApplicationMiddleware)
            .forRoutes('/api/:applicationId/*');
    }
}