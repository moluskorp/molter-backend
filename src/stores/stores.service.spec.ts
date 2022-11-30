import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';
import { StoresService } from './stores.service';

describe('StoresService', () => {
  let service: StoresService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
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

    service = await module.resolve<StoresService>(StoresService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a store', async () => {
    const store = {
      name: 'Test Store Create',
      nickname: 'test',
      cnpj: '123',
      ie: '123',
      address: {
        postalCode: '123',
        postalcode: '1',
        street: 'test',
        number: '123',
        complement: '123',
        district: 'test',
        city: 'test',
        state: 'test',
      },
      type: 'Simples',
      invoiceNumber: 1,
      invoiceSerie: '123',
    };
    const createdStore = {
      ...store,
      id: 'id',
      address: { ...store.address, id: 'id' },
    };

    prisma.store.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.store.create = jest.fn().mockReturnValueOnce(createdStore);
    expect(await service.create(store)).toHaveProperty('id');
  });

  it('should not be able to create a store with existing cnpj', async () => {
    const store = {
      name: 'Test Store',
      nickname: 'test',
      cnpj: '123',
      ie: '123',
      address: {
        postalCode: '123',
        postalcode: '1',
        street: 'test',
        number: '123',
        complement: '123',
        district: 'test',
        city: 'test',
        state: 'test',
      },
      type: 'Simples',
      invoiceNumber: 1,
      invoiceSerie: '123',
    };
    const createdStore = {
      ...store,
      id: 'id',
    };

    prisma.store.findFirst = jest.fn().mockReturnValueOnce(createdStore);

    await expect(async () => {
      await service.create(store);
    }).rejects.toEqual(new AppError('CNPJ já existe'));
  });

  it('should be able to delete a store', async () => {
    const store = {
      name: 'Test Store',
      nickname: 'test',
      cnpj: '123',
      ie: '123',
      address: {
        id: '123',
        postalCode: '123',
        postalcode: '1',
        street: 'test',
        number: '123',
        complement: '123',
        district: 'test',
        city: 'test',
        state: 'test',
      },
      type: 'Simples',
      invoiceNumber: 1,
      invoiceSerie: '123',
    };
    const createdStore = {
      ...store,
      id: 'id',
      active: false,
    };

    prisma.store.update = jest.fn().mockReturnValueOnce(createdStore);

    expect(await service.remove('id')).toHaveProperty('active', false);
  });
});
