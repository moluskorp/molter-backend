import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/AppError';

describe('ClientsService', () => {
  let service: ClientsService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService, {
        provide: PrismaClient,
        useValue: new PrismaClient({
          datasources: {
            db: {
              url: 'postgresql://undefined:undefined@undefined:undefined/undefined?schema=public',
            },
          },
        }),
      },],
    }).compile();

    service = await module.resolve<ClientsService>(ClientsService);
    prisma = module.get<PrismaClient>(PrismaClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const client = {
      name: 'Claudio',
      nickname: 'clauds',
      cpf: '123',
      rg: 'isento',
      address: {
        postalCode: '123',
        street: 'rua',
        number: '123',
        complement: 'comp',
        district: 'bairro',
        city: 'sao paulo',
        state: 'SP',
      },
      type: 'PF',
      contact: [{ type: 'phone', value: '123' }],
      finalConsumer: true,
    };
    const clientCreated = {
      id: 'id',
      name: 'Claudio',
      nickname: 'clauds',
      cpf: '123',
      rg: 'isento',
      address: {
        postalCode: '123',
        street: 'rua',
        number: '123',
        complement: 'comp',
        district: 'bairro',
        city: 'sao paulo',
        state: 'SP',
      },
      type: 'PF',
      contact: [{ type: 'phone', value: '123' }],
      finalConsumer: true,
    };

    prisma.client.create = jest.fn().mockReturnValueOnce(clientCreated);
    prisma.client.findFirst = jest.fn().mockReturnValue(null);

    expect(await service.create(client)).toHaveProperty('id');
  });

  it('should not create a client with the same cpf', async () => {
    const client = {
      name: 'Claudio',
      nickname: 'clauds',
      cpf: '123',
      rg: 'isento',
      address: {
        postalCode: '123',
        street: 'rua',
        number: '123',
        complement: 'comp',
        district: 'bairro',
        city: 'sao paulo',
        state: 'SP',
      },
      type: 'PF',
      contact: [{ type: 'phone', value: '123' }],
      finalConsumer: true,
    };
    const clientCreated = {
      id: 'id',
      name: 'Claudio',
      nickname: 'clauds',
      cpf: '123',
      rg: 'isento',
      address: {
        postalCode: '123',
        street: 'rua',
        number: '123',
        complement: 'comp',
        district: 'bairro',
        city: 'sao paulo',
        state: 'SP',
      },
      type: 'PF',
      contact: [{ type: 'phone', value: '123' }],
      finalConsumer: true,
    };

    prisma.client.findFirst = jest.fn().mockReturnValueOnce(clientCreated);

    await expect(async () => {
      await service.create(client);
    }).rejects.toEqual(new AppError('Cliente já existe'));
  });

  it('should be able to delete a client', async () => {
    const clientCreated = {
      id: 'id',
      name: 'Claudio',
      nickname: 'clauds',
      active: false,
      cpf: '123',
      rg: 'isento',
      address: {
        postalCode: '123',
        street: 'rua',
        number: '123',
        complement: 'comp',
        district: 'bairro',
        city: 'sao paulo',
        state: 'SP',
      },
      type: 'PF',
      contact: [{ type: 'phone', value: '123' }],
      finalConsumer: true,
    };

    prisma.client.update = jest.fn().mockReturnValueOnce(clientCreated);

    expect(await service.remove('id')).toHaveProperty('active', false);
  });
});
