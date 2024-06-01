import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');

  // Get required services
  const configService = app.get(ConfigService);

  // Open API
  const swaggerConfig = new DocumentBuilder()
    //.addBearerAuth()
    .setTitle('perfect-footies')
    .setDescription('Backend Apis for Project Perfect Footies')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Websockets Gateway test (for sending messages to clients)
  // const websocketsGateway = app.get(NotificationsGateway);
  // setInterval(() => websocketsGateway.sendMessage(), 2000);

  await app.listen(configService.get<string>('port'));
}

bootstrap();
