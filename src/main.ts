import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import InitUtils from '@shared/utils/init/init.utils';

async function bootstrap() {
  const config = new InitUtils().getApplicationInitConfig();

  const app = await NestFactory.create(AppModule, {
    rawBody: config.rawBody,
  });

  // Register plugins and extensions
  app.enableCors({ origin: config.allowOrigin });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  // Start the application
  await app.listen(config.listeningPort);

  InitUtils.log(`Purpuly Apps API is running on: ${await app.getUrl()}`);
}

bootstrap();
