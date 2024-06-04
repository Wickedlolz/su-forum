import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
