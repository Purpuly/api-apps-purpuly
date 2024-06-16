import routes from './app.routes';
import ApiModule from './api.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register(routes),
    ApiModule,
  ],
})
export class AppModule { }
