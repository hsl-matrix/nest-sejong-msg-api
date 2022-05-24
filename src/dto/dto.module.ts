import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';

import { DtoService } from './dto.service';
import { DtoController } from './dto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SjConfig, SjConfigSchema } from './schemas/config.schema';
import { Template, TemplateSchema } from './schemas/template.schema';
import { MsgLog, MsgLogSchema } from './schemas/msgLog.schema';
import { SjCode, SjCodeSchema } from './schemas/sjcode.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    MongooseModule.forFeatureAsync([
      {
        name: SjConfig.name,
        useFactory: () => {
          const schema = SjConfigSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: Template.name,
        useFactory: () => {
          const schema = TemplateSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: MsgLog.name,
        useFactory: () => {
          const schema = MsgLogSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
      {
        name: SjCode.name,
        useFactory: () => {
          const schema = SjCodeSchema;
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
  ],
  providers: [DtoService],
  controllers: [DtoController],
  exports: [DtoService],
})
export class DtoModule {}
