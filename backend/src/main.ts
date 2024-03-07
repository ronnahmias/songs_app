import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger Api Documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder().setTitle('Songs App RestAPI').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // Enable CORS
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Start the application Port
  const port = process.env.PORT || 3333;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
