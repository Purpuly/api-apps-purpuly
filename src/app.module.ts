import routes from './app.routes';
import ApiModule from './api.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(routes),
    ApiModule,
  ],
})
export class AppModule { }
