import { Test, TestingModule } from '@nestjs/testing';
import { SmsMsgService } from './sms-msg.service';

describe('SmsMsgService', () => {
  let service: SmsMsgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsMsgService],
    }).compile();

    service = module.get<SmsMsgService>(SmsMsgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
