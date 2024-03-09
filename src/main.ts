import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as document from '../doc/openapi.json';
import { AppModule } from './app.module';

import 'dotenv/config';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('api', app, document as OpenAPIObject);

  await app.listen(port);
}
bootstrap();
