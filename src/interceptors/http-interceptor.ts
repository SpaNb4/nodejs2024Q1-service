import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from 'src/logger/logger.service';

interface DataToLog {
  fieldName: string;
  fieldValue: string;
}

const formatData = (dataToLog: DataToLog[]) => {
  return dataToLog
    .map(
      ({ fieldName, fieldValue }) =>
        `${fieldName}: ${JSON.stringify(fieldValue, null, 2)}`,
    )
    .join('\n');
};

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const { url, body, query } = request;
    const { statusCode } = response;

    const logger = new Logger();

    return next.handle().pipe(
      tap((data) => {
        logger.log(
          `REQUEST: ${formatData([
            { fieldName: 'url', fieldValue: url },
            { fieldName: 'body', fieldValue: body },
            { fieldName: 'query', fieldValue: query },
          ])}`,
        );
        logger.log(
          `RESPONSE: ${formatData([
            { fieldName: 'statusCode', fieldValue: statusCode },
            { fieldName: 'data', fieldValue: data },
          ])}`,
        );
      }),
    );
  }
}
