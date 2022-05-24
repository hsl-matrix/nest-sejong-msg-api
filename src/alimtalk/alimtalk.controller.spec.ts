import { Test, TestingModule } from '@nestjs/testing';
import { AlimtalkController } from './alimtalk.controller';

describe('AlimtalkController', () => {
  let controller: AlimtalkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlimtalkController],
    }).compile();

    controller = module.get<AlimtalkController>(AlimtalkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
