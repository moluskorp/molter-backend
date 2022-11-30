import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConnectionInterceptor } from './connection.interceptor';
import { ConnectionMiddleware } from './connection.middleware';
import { ErrorInterceptor } from './error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(ConnectionMiddleware);
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalInterceptors(new ConnectionInterceptor());
  await app.listen(3001);
}
bootstrap();
