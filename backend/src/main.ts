// backend/src/main.ts

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

import { ValidationPipe } from '@nestjs/common';

import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ======================
  // CONFIG
  // ======================

  const configService = app.get(ConfigService);

  // ======================
  // COOKIES
  // ======================

  app.use(cookieParser());

  // ======================
  // VALIDATION
  // ======================

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  // ======================
  // CORS
  // ======================

  app.enableCors({
    origin: [configService.get<string>('FRONTEND_URL')!],

    credentials: true,
  });

  // ======================
  // PORT
  // ======================

  const port = configService.get<number>('PORT') || 3001;

  // ======================
  // START SERVER
  // ======================

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}

bootstrap();
