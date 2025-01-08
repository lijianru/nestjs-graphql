import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike()
        )
      })
    ]
  })

  const logger = WinstonModule.createLogger({
    instance,
  })
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const httpAdapter = app.get(HttpAdapterHost)

  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
