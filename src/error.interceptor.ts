import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { AppError } from './errors/AppError';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(async (error) => {
        const { prisma } = context.switchToHttp().getResponse().locals;
        if (prisma) {
          await prisma.$disconnect();
        }
        if (error instanceof AppError) {
          throw new HttpException(error.message, error.statusCode);
        } else {
          throw new NotFoundException(error.message);
        }
      }),
    );
  }
}
