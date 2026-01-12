import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../libs/common/src/filters/base.exception.filters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors('*');
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning();
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API documentation for the Todo application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = await SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('PORT') || 5000);

  Logger.debug(
    `Application is running on: http://localhost:${
      configService.get<number>('PORT') || 5000
    }`,
  );
  Logger.debug(
    `Swagger docs available at: http://localhost:${
      configService.get<number>('PORT') || 5000
    }/docs`,
  );
}
bootstrap();
