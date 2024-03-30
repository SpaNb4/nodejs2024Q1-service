import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class Logger extends ConsoleLogger {
  error(message: any, trace: string) {
    const timestamp = new Date().toISOString();

    fs.appendFileSync(
      path.join(__dirname, '../../logs/error.log'),
      `${timestamp} - ${message}\n${trace}\n`,
    );

    super.error(message, trace);
  }

  log(message: any) {
    const timestamp = new Date().toISOString();

    fs.appendFileSync(
      path.join(__dirname, '../../logs/app.log'),
      `${timestamp} - ${message}\n`,
    );

    super.log(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }
}
