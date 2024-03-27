import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { Logger } from 'src/logger/logger.service';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const { url, body, query } = request;

    // const logger = new Logger();

    return next.handle().pipe(
      tap(() => {
        // logger.log(
        //   `${url} body=${JSON.stringify(body)} query=${JSON.stringify(query)}`,
        // );
      }),
    );
  }
}
