import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { NcmsService } from './ncms.service';

describe('NcmsService', () => {
  let service: NcmsService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NcmsService,
        {
          provide: PrismaClient,
          useValue: new PrismaClient({
            datasources: {
              db: {
                url: 'postgresql://undefined:undefined@undefined:undefined/undefined?schema=public',
              },
            },
          }),
        },
      ],
    }).compile();

    service = await module.resolve<NcmsService>(NcmsService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a ncm', async () => {
    const ncm = {
      code: '123',
      description: 'test',
    };

    const ncmCreated = {
      ...ncm,
      id: 'id',
    };

    prisma.ncm.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.ncm.create = jest.fn().mockReturnValueOnce(ncmCreated);

    expect(await service.create(ncm)).toHaveProperty('id');
  });

  it('should not be able to create a existing ncm', async () => {
    const ncm = {
      code: '123',
      description: 'test',
    };

    const ncmCreated = {
      ...ncm,
      id: 'id',
    };

    prisma.ncm.findFirst = jest.fn().mockReturnValueOnce(ncmCreated);

    await expect(async () => {
      await service.create(ncm);
    }).rejects.toEqual(new AppError('Ncm já existente'));
  });
});
