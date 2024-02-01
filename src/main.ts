import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger integration 
  const config = new DocumentBuilder()
    .setTitle('Ecommerce Demo API Documentation')
    .setDescription('Ecommerce Demo API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'jwt' },
      'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cors restriction
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();