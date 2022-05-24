import { Test, TestingModule } from '@nestjs/testing';
import { RediCacheController } from './redi-cache.controller';

describe('RediCacheController', () => {
  let controller: RediCacheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RediCacheController],
    }).compile();

    controller = module.get<RediCacheController>(RediCacheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
