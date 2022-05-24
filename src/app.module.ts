import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RediCacheModule } from './redi-cache/redi-cache.module';
import { TasksModule } from './tasks/tasks.module';
import { ApisModule } from './apis/apis.module';
import { DtoModule } from './dto/dto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { AlimtalkModule } from './alimtalk/alimtalk.module';
import { SmsMsgController } from './sms-msg/sms-msg.controller';
import { SmsMsgModule } from './sms-msg/sms-msg.module';

@Module({
  imports: [
    RediCacheModule,
    TasksModule,
    ApisModule,
    DtoModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    AlimtalkModule,
    SmsMsgModule,
    MongooseModule.forRoot('mongodb://211.191.186.155:27017/sjsms'),
  ],
  controllers: [AppController, SmsMsgController],
  providers: [AppService],
})
export class AppModule {}
