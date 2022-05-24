import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MsgLogDocument = MsgLog & Document;

@Schema({ timestamps: true })
export class MsgLog {
  @Prop()
  senderCenter: string;

  @Prop()
  ipccCenterCode: string;

  @Prop()
  templateType: string;

  @Prop()
  templateCode: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;

  @Prop()
  callback: string;

  @Prop()
  sendCode: string;

  @Prop()
  state: number;

  @Prop()
  result: string;

  @Prop()
  resultCode: string;

  @Prop()
  fileList: [];
}

export const MsgLogSchema = SchemaFactory.createForClass(MsgLog);
