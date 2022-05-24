import { Module } from '@nestjs/common';
import { AlimtalkService } from './alimtalk.service';
import { AlimtalkController } from './alimtalk.controller';
import { ApisModule } from 'src/apis/apis.module';
import { RediCacheModule } from 'src/redi-cache/redi-cache.module';
import { DtoModule } from 'src/dto/dto.module';

@Module({
  imports: [ApisModule, RediCacheModule, DtoModule],
  providers: [AlimtalkService],
  controllers: [AlimtalkController],
})
export class AlimtalkModule {}
