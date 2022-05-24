import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop()
  senderCenter: string;

  @Prop()
  templateType: string;

  @Prop()
  templateCode: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;

  @Prop()
  replaceParams: [];

  @Prop()
  callback: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
