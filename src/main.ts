import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
    ],
  });

  const logger = WinstonModule.createLogger({
    instance,
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
