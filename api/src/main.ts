import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
const port = process.env.PORT || 4000
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  
  await app.listen(port);
}
bootstrap();
