import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app/app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const corsOptions = { origin: ['http://localhost:4200'] };

  app.enableCors(corsOptions);

  app.use(morgan('dev'));

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware for app.use : ip = ', req.ip);
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //transformer les paramettre en type de données souhaité
      whitelist: true, //Ne récupérer que les paramettre définie dans les validateurs
      forbidNonWhitelisted: true, //déclancher l'érreur s'il y a des paramettres non siouhaité
    }),
  );

  app.useGlobalInterceptors(new DurationInterceptor());

  // await app.listen(process.env.APP_PORT);
  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
