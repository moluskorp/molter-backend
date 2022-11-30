import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { TaxesService } from './taxes.service';

describe('TaxesService', () => {
  let service: TaxesService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaxesService,
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

    service = await module.resolve<TaxesService>(TaxesService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a taxe', async () => {
    const taxe = {
      ncm: '123',
      taxNature: '123',
      hasIpi: false,
      cstIpi: '00',
      pisCofinsNature: '123',
    };

    const createdTaxe = { ...taxe, id: '1' };

    prisma.taxes.create = jest.fn().mockReturnValueOnce(createdTaxe);

    expect(await service.create(taxe)).toHaveProperty('id');
  });
});
