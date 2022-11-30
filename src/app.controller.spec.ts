import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  const dynamicModule = (fn: any) => {
    return Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  };

  it('should be defined', async () => {
    const module: TestingModule = await dynamicModule(jest.fn());
    appController = module.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });
});
