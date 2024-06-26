import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { HttpInterceptor } from './interceptors/http-interceptor';
import { LoggerService } from './logger/logger.service';

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

const port = process.env.BACKEND_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerService = app.get(LoggerService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  const adapterHost = app.get(HttpAdapterHost);

  app.useLogger(loggerService);
  app.useGlobalInterceptors(new HttpInterceptor(loggerService));
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost, loggerService));
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

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
