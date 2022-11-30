import { Module } from '@nestjs/common';
import { NcmsService } from './ncms.service';
import { NcmsController } from './ncms.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [NcmsController],
  providers: [NcmsService, { provide: PrismaClient, useValue: null }],
})
export class NcmsModule {}
