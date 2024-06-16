import { Module } from "@nestjs/common";
import { DatabaseModule } from "@shared/modules/database/database.module";
import ResetPasswordModule from "./modules/ResetPassword/reset-password.module";

@Module({
    imports: [
        DatabaseModule,
        ResetPasswordModule,
    ],
})
//
// From vendor-api project :
//
// export class ApiModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ApiStoreMiddleware).forRoutes('/api/:storeId/*');
//   }
// }
//
export default class ApiModule {}