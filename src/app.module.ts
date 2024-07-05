import routes from './app.routes';
import ApiModule from './api.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import SharedModule from '@shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routes),
    ApiModule,
    SharedModule,
  ],
})
export class AppModule { }
