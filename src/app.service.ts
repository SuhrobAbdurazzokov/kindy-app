import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import { AllExceptionFilter } from './infrastructure/exception/AllException.filter';

export class Application {
  static async start() {
    const PORT = Number(config.API_PORT);

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );

    app.useGlobalFilters(new AllExceptionFilter());

    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);

    const swagger = new DocumentBuilder()
      .setTitle('Kind App')
      .setDescription('Kind App: We will, win children!')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup(globalPrefix, app, document);

    await app.listen(PORT, () => console.log(`Server running on port:`, PORT));
  }
}
