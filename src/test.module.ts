import {
  Injectable,
  Module,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
@Injectable()
export class TestModule implements OnModuleInit, OnModuleDestroy {
  onModuleDestroy() {
    console.log('módulo destruído');
  }

  onModuleInit() {
    console.log('iniciou o módulo');
  }
  connectionString = '';
}
