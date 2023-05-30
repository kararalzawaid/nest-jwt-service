import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false
      },
      exceptionFactory: (errors: ValidationError[] = []) =>
        new BadRequestException(errors)
    })
  );

  const options = new DocumentBuilder()
    .setTitle('Bla Service')
    .setDescription('Test services')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.SERVER_PORT || 4000;
  console.log(`App is running on port ${port}`);

  await app.listen(port);
  await app.startAllMicroservices();
}

bootstrap();