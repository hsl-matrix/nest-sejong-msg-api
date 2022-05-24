import { Injectable } from '@nestjs/common';
import { RediCacheService } from 'src/redi-cache/redi-cache.service';
import * as FormData from 'form-data';
import { ApisService } from 'src/apis/apis.service';
import { DtoService } from 'src/dto/dto.service';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { createReadStream } from 'fs';

@Injectable()
export class SmsMsgService {
  constructor(
    private readonly rediCacheService: RediCacheService,
    private readonly apisService: ApisService,
    private readonly dtoService: DtoService,
  ) {}

  fn_gen_sj_userKey() {
    return `sj${Math.floor(new Date().getTime() / 1000)}`;
  }

  async fn_cache_sj_config(senderCenter) {
    const cacheSjConfig = await this.rediCacheService.getCache('sjConfig');
    const sjConfig = JSON.parse(cacheSjConfig);
    const findSjConfig = sjConfig.find(
      (sc) => sc.senderCenter === senderCenter,
    );

    return findSjConfig;
  }

  async fn_cache_sj_config_by_callback(callback) {
    const cacheSjConfig = await this.rediCacheService.getCache('sjConfig');
    const sjConfig = JSON.parse(cacheSjConfig);
    console.log(' sjConfig = ', sjConfig);
    const findSjConfig = sjConfig.find(
      (sc) => sc.callback.indexOf(callback) > -1,
    );

    return findSjConfig;
  }

  async fn_cache_template(templateCode) {
    const cacheTemplate = await this.rediCacheService.getCache('template');
    const template = JSON.parse(cacheTemplate);

    const findTemplate = template.find(
      (sc) => sc.templateCode === templateCode && sc.templateType === 'sms',
    );

    return findTemplate;
  }

  fnGetByteB(str) {
    let byte = 0;

    for (let i = 0; i < str.length; ++i) {
      // 기본 한글 2바이트 처리
      str.charCodeAt(i) > 127 ? (byte += 2) : byte++;
    }
    return byte;
  }

  checkIfFileOrDirectoryExists(path: string): boolean {
    return fs.existsSync(path);
  }

  async fn_create_file(file) {
    const path = '/root/Tmp/mmsFiles';
    if (!this.checkIfFileOrDirectoryExists(path)) {
      fs.mkdirSync(path);
    }

    const fileName = `${uuidv4()}.jpg`;
    fs.writeFileSync(`${path}/${fileName}`, file.buffer);

    return fileName;
  }

  // 병렬 처리
  async fnCreateFileParallel(fileList) {
    console.log('all  fnCreateFileParallel start ');

    const promises = fileList.map((file) => {
      return this.fn_create_file(file);
    });
    console.log('all shCbkSendParallel done ');
    return await Promise.all(promises);
  }

  async fn_send_sms(
    senderCenter,
    templateCode,
    cutoTel,
    contents,
    callback,
    files,
    ipccCenterCode,
  ) {
    console.log('files  = ', files);

    const arrFileList = await this.fnCreateFileParallel(files);
    console.log('arrFileList  = ', arrFileList);
    const userKey = this.fn_gen_sj_userKey();
    let findSjConfig = null;
    let findTemplate = null;
    if (senderCenter && templateCode) {
      findSjConfig = await this.fn_cache_sj_config(senderCenter);
      findTemplate = await this.fn_cache_template(templateCode);
    } else {
      findSjConfig = await this.fn_cache_sj_config_by_callback(callback);
      findTemplate = { templateType: 'sms' };
    }
    console.log('findSjConfig  = ', findSjConfig);
    const {
      sejongApiKey,
      smsUrl,
      lmsUrl,
      mmsUrl,
      senderCenter: cnfSenderCenter,
      ipccCenterCode: cnfIpccCenterCode,
    } = findSjConfig;
    const { title = '', contents: tplContents, templateType } = findTemplate;
    let url = this.fnGetByteB(contents || tplContents) > 90 ? lmsUrl : smsUrl;
    let paramTemplateType =
      this.fnGetByteB(contents || tplContents) > 90 ? 'lms' : templateType;

    const data = new FormData();
    data.append('callback', '16881000');
    data.append('title', title);
    data.append('contents', contents || tplContents);
    data.append('receiverTelNo', cutoTel);
    data.append('userKey', userKey);

    if (arrFileList.length > 0) {
      arrFileList.forEach((afl, i) => {
        const mmsPath = '/root/Tmp/mmsFiles/';
        data.append(`imageFile${i + 1}`, createReadStream(`${mmsPath}${afl}`));
      });
      url = mmsUrl;
      paramTemplateType = 'mms';
    }

    const config = {
      method: 'post',
      url: url,
      headers: {
        sejongApiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
        ...data.getHeaders(),
      },
      data: data,
    };

    const resApi = await this.apisService.apiRequest(config);

    const { sendCode = null } = resApi;

    this.dtoService.msgLogCreate({
      senderCenter: senderCenter || cnfSenderCenter,
      ipccCenterCode: ipccCenterCode || cnfIpccCenterCode,
      templateType: paramTemplateType,
      templateCode,
      title: '',
      contents,
      callback: '',
      sendCode,
      state: 0,
      result: '발송시도',
      resultCode: '0000',
      fileList: arrFileList,
    });

    return resApi;
  }
}
