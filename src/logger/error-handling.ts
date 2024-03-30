import { Logger } from './logger.service';

export const addErrorHandling = () => {
  process.on('uncaughtException', (error: Error) => {
    const logger = new Logger();

    logger.error(`Uncaught Exception: ${error.message}`, error.stack);

    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    const logger = new Logger();

    logger.error(`Unhandled Rejection: ${error.message}`, error.stack);

    process.exit(1);
  });
};
