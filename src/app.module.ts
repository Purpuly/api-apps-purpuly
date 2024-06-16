import routes from './app.routes';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register(routes),
  ],
})
export class AppModule {}
