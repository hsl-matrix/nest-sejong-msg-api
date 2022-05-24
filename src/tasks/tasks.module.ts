import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { RediCacheModule } from 'src/redi-cache/redi-cache.module';
import { ApisModule } from 'src/apis/apis.module';
import { TasksService } from './tasks.service';
import { DtoModule } from 'src/dto/dto.module';

@Module({
  imports: [RediCacheModule, ApisModule, DtoModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
