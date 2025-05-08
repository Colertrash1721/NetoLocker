import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración CORS más específica
  app.enableCors({
    origin: ['http://128.85.27.70:82', 'http://localhost:82', 'http://localhost:3001', 'http://128.85.27.70:8082'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
