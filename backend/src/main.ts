import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as helmet from 'helmet';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

const debug = require('debug')('collabcode');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        wsSrc: ["'self'", "wss://"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"],
      },
    },
    referrerPolicy: { policy: 'no-referrer' },
  }));

  // Enable CORS
  app.enableCors({
    origin: '*',  // Configure for production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // WebSocket adapter
  app.useWebSocketAdapter(WsAdapter);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('CollabCode API')
    .setDescription('Real-time collaborative coding platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 CollabCode API listening on port ${port}`);
  logger.log(`📚 Swagger: http://localhost:${port}/api`);
}

bootstrap();
