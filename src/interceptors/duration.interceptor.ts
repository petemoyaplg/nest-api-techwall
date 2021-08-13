import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn: number = Date.now();
    console.log('request in created at ', dateIn);

    return next.handle().pipe(
      tap(() => {
        const dateOut: number = Date.now();
        console.log('request out created at ', dateOut);
        console.log(`Request duration ${dateOut - dateIn} ms`);
      }),
    );
  }
}
