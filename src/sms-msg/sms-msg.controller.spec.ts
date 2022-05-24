import { Test, TestingModule } from '@nestjs/testing';
import { SmsMsgController } from './sms-msg.controller';

describe('SmsMsgController', () => {
  let controller: SmsMsgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsMsgController],
    }).compile();

    controller = module.get<SmsMsgController>(SmsMsgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
