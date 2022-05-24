import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RediCacheModule } from 'src/redi-cache/redi-cache.module';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';

@Module({
  imports: [HttpModule, RediCacheModule],
  controllers: [ApisController],
  providers: [ApisService],
  exports: [ApisService],
})
export class ApisModule {}
