import { Test, TestingModule } from '@nestjs/testing';
import { NcmsController } from './ncms.controller';
import { NcmsService } from './ncms.service';
import { PrismaClient } from '@prisma/client';

describe('NcmsController', () => {
  let controller: NcmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NcmsController],
      providers: [NcmsService, { provide: PrismaClient, useValue: null }],
    }).compile();

    controller = module.get<NcmsController>(NcmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
