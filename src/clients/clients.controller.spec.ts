import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { createMock } from '@golevelup/ts-jest';
import { PrismaClient } from '@prisma/client';

describe('ClientsController', () => {
  let controller: ClientsController;

  const dynamicModule = (fn: any) => {
    return Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: createMock<ClientsService>(fn),
        },
        PrismaClient,
      ],
    }).compile();
  };

  it('should be defined', async () => {
    const module: TestingModule = await dynamicModule(jest.fn());
    controller = module.get<ClientsController>(ClientsController);
    expect(controller).toBeDefined();
  });
});
