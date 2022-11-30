import { Module } from '@nestjs/common';
import { TaxesService } from './taxes.service';
import { TaxesController } from './taxes.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TaxesController],
  providers: [TaxesService, { provide: PrismaClient, useValue: null }],
})
export class TaxesModule {}
