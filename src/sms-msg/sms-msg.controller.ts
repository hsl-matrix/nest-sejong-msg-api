import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SmsMsgService } from './sms-msg.service';

@Controller('sms-msg')
export class SmsMsgController {
  constructor(private readonly smsMsgService: SmsMsgService) {}

  @Get('sendSms')
  //@UseGuards(JwtAuthGuard)
  async sendSms(@Query() query): Promise<any> {
    const {
      senderCenter = null,
      cutoTel,
      templateCode = null,
      contents,
      callback = null,
      files = [],
      ipccCenterCode = null,
    } = query;

    const resApi = await this.smsMsgService.fn_send_sms(
      senderCenter,
      templateCode,
      cutoTel,
      contents,
      callback,
      files,
      ipccCenterCode,
    );
    console.log('resApi  = ', resApi);

    return resApi;
  }

  @Post('sendSms')
  @UseInterceptors(AnyFilesInterceptor())
  //@UseGuards(JwtAuthGuard)
  async sendMms(
    @Body() body,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    console.log('files  = ', files);
    const {
      senderCenter = null,
      cutoTel,
      templateCode = null,
      contents,
      callback = null,
      ipccCenterCode = null,
    } = body;

    const resApi = await this.smsMsgService.fn_send_sms(
      senderCenter,
      templateCode,
      cutoTel,
      contents,
      callback,
      files,
      ipccCenterCode,
    );
    console.log('resApi  = ', resApi);

    return resApi;
  }
}
