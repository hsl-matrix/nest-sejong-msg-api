import { Test, TestingModule } from '@nestjs/testing';
import { RediCacheService } from './redi-cache.service';

describe('RediCacheService', () => {
  let service: RediCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RediCacheService],
    }).compile();

    service = module.get<RediCacheService>(RediCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
