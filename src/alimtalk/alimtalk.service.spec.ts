import { Test, TestingModule } from '@nestjs/testing';
import { AlimtalkService } from './alimtalk.service';

describe('AlimtalkService', () => {
  let service: AlimtalkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlimtalkService],
    }).compile();

    service = module.get<AlimtalkService>(AlimtalkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
