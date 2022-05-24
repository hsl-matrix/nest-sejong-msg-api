import { Module } from '@nestjs/common';
import { ApisModule } from 'src/apis/apis.module';
import { DtoModule } from 'src/dto/dto.module';
import { RediCacheModule } from 'src/redi-cache/redi-cache.module';
import { SmsMsgController } from './sms-msg.controller';

import { SmsMsgService } from './sms-msg.service';

@Module({
  imports: [RediCacheModule, ApisModule, DtoModule],
  providers: [SmsMsgService],
  controllers: [SmsMsgController],
  exports: [SmsMsgService],
})
export class SmsMsgModule {}
