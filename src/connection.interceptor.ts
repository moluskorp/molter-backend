import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ConnectionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    try {
      return next.handle().pipe(
        tap(async () => {
          const { prisma } = context.switchToHttp().getResponse().locals;
          if (prisma) {
            await prisma.$disconnect();
          }
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }
}
