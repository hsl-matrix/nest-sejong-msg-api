import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SjCodeDocument = SjCode & Document;

@Schema({ timestamps: true })
export class SjCode {
  @Prop()
  code: string;

  @Prop()
  codeResult: string;
}

export const SjCodeSchema = SchemaFactory.createForClass(SjCode);
