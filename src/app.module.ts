import routes from './app.routes';
import ApiModule from './api.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import SharedModule from '@shared/shared.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routes),
    ApiModule,
    SharedModule,
  ],
})
export class AppModule { }
