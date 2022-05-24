import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SjConfigDocument = SjConfig & Document;

@Schema({ timestamps: true })
export class SjConfig {
  @Prop()
  senderCenter: string;

  @Prop()
  ipccCenterCode: string;

  @Prop()
  senderKey: string;

  @Prop()
  alimtalkUrl: string;

  @Prop()
  lmsUrl: string;

  @Prop()
  mmsUrl: string;

  @Prop()
  smsUrl: string;

  @Prop()
  sejongApiKey: string;
}

export const SjConfigSchema = SchemaFactory.createForClass(SjConfig);
