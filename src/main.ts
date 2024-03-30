import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { HttpInterceptor } from './interceptors/http-interceptor';
import { addErrorHandling } from './logger/error-handling';
import { Logger } from './logger/logger.service';

// Temporary fix for BigInt serialization
// https://github.com/expressjs/express/issues/4453
declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this.toString());
};

import 'dotenv/config';

const port = process.env.BACKEND_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.useGlobalInterceptors(new HttpInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  addErrorHandling();

  const file = await fs.readFile(
    path.join(__dirname, '../doc/api.yaml'),
    'utf8',
  );
  const swaggerDocument = YAML.parse(file);

  SwaggerModule.setup('api', app, swaggerDocument);

  // Unhandled error
  // throw new Error('Test error');

  // Uncatched error
  // setTimeout(() => {
  //   throw new Error('Another error');
  // }, 1000);

  await app.listen(port);
}
void bootstrap();
