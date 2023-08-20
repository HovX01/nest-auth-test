import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
// import { WarpResponseInterceptor } from '../dist/common/interceptors/warpresponse/warp-response.interceptor';

async function bootstrap() {
  const logger: Logger = new Logger(NestApplication.name);
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new WarpResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => {
    logger.log(`Server run on port ${PORT}`);
  });
  logger.log(`CWD = ${process.cwd()}`);
}
bootstrap();
