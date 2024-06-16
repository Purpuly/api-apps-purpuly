import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "@shared/modules/database/database.module";
import ResetPasswordModule from "./modules/ResetPassword/reset-password.module";
import ApplicationIdMiddleware from "@core/middlewares/ApplicationId.middleware";
import ApplicationModule from "@shared/modules/app/application.module";

@Module({
    imports: [
        ApplicationModule,
        DatabaseModule,
        ResetPasswordModule,
    ],
})
export default class ApiModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ApplicationIdMiddleware).forRoutes('/api/:applicationId/*');
    }
}