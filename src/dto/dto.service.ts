import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SjConfig, SjConfigDocument } from './schemas/config.schema';
import { Template, TemplateDocument } from './schemas/template.schema';
import { MsgLog, MsgLogDocument } from './schemas/msgLog.schema';
import { SjCode, SjCodeDocument } from './schemas/sjcode.schema';

@Injectable()
export class DtoService {
  constructor(
    @InjectModel(SjConfig.name)
    private sjConfigModel: Model<SjConfigDocument>,
    @InjectModel(Template.name)
    private templateModel: Model<TemplateDocument>,
    @InjectModel(MsgLog.name)
    private msgLogModel: Model<MsgLogDocument>,
    @InjectModel(SjCode.name)
    private sjCodeLogModel: Model<SjCodeDocument>,
  ) {}

  async findAllConfig(): Promise<SjConfig[]> {
    return this.sjConfigModel.find().exec();
  }
  async findAllTemplate(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }
  async findAllMsgLog(): Promise<MsgLog[]> {
    return this.msgLogModel.find().exec();
  }
  async findResultMsgLog(): Promise<MsgLog[]> {
    return this.msgLogModel.find({ state: 0 }).exec();
  }
  async findAllSjCode(): Promise<SjCode[]> {
    return this.sjCodeLogModel.find().exec();
  }
  async msgLogCreate(msgLogParam: any): Promise<MsgLog> {
    const createdMsgLog = new this.msgLogModel(msgLogParam);
    return createdMsgLog.save();
  }

  async msgLogResultUpdate(msgLogParam: any): Promise<MsgLog> {
    const { sendCode, result = '', resultCode } = msgLogParam;

    const doc = await this.msgLogModel.findOne({ sendCode });
    doc.result = result;
    doc.resultCode = resultCode;
    doc.state = resultCode === '100' ? 1 : 2;

    return doc.save();
  }
}
