import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logLevels = ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'];
  private currentLogLevel: LogLevel;
  private errorLogFilePath: string;
  private commonLogFilePath: string;
  private maxFileSize: number;

  constructor() {
    super();

    this.currentLogLevel = (process.env.LOG_LEVEL as LogLevel) || 'fatal';
    this.errorLogFilePath = path.join(__dirname, '../../logs/error.log');
    this.commonLogFilePath = path.join(__dirname, '../../logs/common.log');
    // Default to 10 kB
    this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE) * 1000 || 10 * 1000;

    this.addErrorListeners();

    console.log('Current log level:', this.currentLogLevel);
    console.log(
      'Enabled log levels:',
      this.logLevels
        .map((level: LogLevel) => (this.shouldLog(level) ? level : null))
        .filter(Boolean)
        .join(', '),
    );
  }

  log(message: any) {
    if (this.shouldLog('log')) {
      this.logToFile('log', message);

      super.log(message);
    }
  }

  fatal(message: any) {
    if (this.shouldLog('fatal')) {
      this.logToFile('fatal', message);

      super.log(message);
    }
  }

  error(message: any, trace: string) {
    if (this.shouldLog('error')) {
      this.logToFile('error', message);

      super.error(message, trace);
    }
  }

  warn(message: any) {
    if (this.shouldLog('warn')) {
      this.logToFile('warn', message);

      super.warn(message);
    }
  }

  debug(message: any) {
    if (this.shouldLog('debug')) {
      this.logToFile('debug', message);

      super.debug(message);
    }
  }

  verbose(message: any) {
    if (this.shouldLog('verbose')) {
      this.logToFile('verbose', message);

      super.verbose(message);
    }
  }

  private logToFile(level: LogLevel, message: string) {
    const timestamp = new Date().toISOString();
    const logFilePath =
      level === 'error' || level === 'fatal'
        ? this.errorLogFilePath
        : this.commonLogFilePath;

    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`);

    const stats = fs.statSync(logFilePath);
    const pathWithoutExtension = logFilePath.replace(/\.[^/.]+$/, '');

    if (stats.size >= this.maxFileSize) {
      const rotatedFilePath = `${pathWithoutExtension}.${timestamp.replace(/:/g, '-')}.log`;
      fs.renameSync(logFilePath, rotatedFilePath);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const index = this.logLevels.indexOf(level);

    const currentIndex = this.logLevels.indexOf(this.currentLogLevel);

    return index <= currentIndex;
  }

  private addErrorListeners() {
    process.on('uncaughtException', (error: Error) => {
      this.error(`Uncaught Exception: ${error.message}`, error.stack);

      process.exit(1);
    });

    process.on('unhandledRejection', (error: Error) => {
      this.error(`Unhandled Rejection: ${error.message}`, error.stack);

      process.exit(1);
    });
  }
}
