import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [StoresController],
  providers: [StoresService, { provide: PrismaClient, useValue: null }],
})
export class StoresModule {}
