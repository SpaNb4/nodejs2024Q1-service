import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';

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
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const { url, body, query } = request;
    const { statusCode } = response;

    return next.handle().pipe(
      tap((data) => {
        this.loggerService.log(
          `REQUEST: ${formatData([
            { fieldName: 'url', fieldValue: url },
            { fieldName: 'body', fieldValue: body },
            { fieldName: 'query', fieldValue: query },
          ])}`,
        );
        this.loggerService.log(
          `RESPONSE: ${formatData([
            { fieldName: 'statusCode', fieldValue: statusCode },
            { fieldName: 'data', fieldValue: data },
          ])}`,
        );
      }),
    );
  }
}
