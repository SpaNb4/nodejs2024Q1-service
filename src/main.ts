import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
// import { Logger } from './logger/logger.service';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { HttpInterceptor } from './interceptors/http-interceptor';

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

  // app.useLogger(app.get(Logger));

  // app.useGlobalInterceptors(new HttpInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const file = await fs.readFile(
    path.join(__dirname, '../doc/api.yaml'),
    'utf8',
  );
  const swaggerDocument = YAML.parse(file);

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port);
}
void bootstrap();
