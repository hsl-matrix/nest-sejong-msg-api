import { Injectable } from '@nestjs/common';
import { RediCacheService } from 'src/redi-cache/redi-cache.service';
import * as FormData from 'form-data';
import { ApisService } from 'src/apis/apis.service';
import { DtoService } from 'src/dto/dto.service';

@Injectable()
export class AlimtalkService {
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

  async fn_cache_template(templateCode) {
    const cacheTemplate = await this.rediCacheService.getCache('template');
    const template = JSON.parse(cacheTemplate);

    const findTemplate = template.find(
      (sc) => sc.templateCode === templateCode && sc.templateType === 'talk',
    );

    return findTemplate;
  }

  async fn_send_talk(senderCenter, templateCode, cutoTel) {
    const userKey = this.fn_gen_sj_userKey();
    const findSjConfig = await this.fn_cache_sj_config(senderCenter);
    const findTemplate = await this.fn_cache_template(templateCode);

    const { sejongApiKey, alimtalkUrl, senderKey } = findSjConfig;
    const { title = '', contents, templateType } = findTemplate;

    const data = new FormData();

    data.append('plusFriendId', senderCenter);
    data.append('senderKey', senderKey);
    data.append('title', title);
    data.append('contents', contents);
    data.append('receiverTelNo', cutoTel);
    data.append('templateCode', templateCode);
    data.append('userKey', userKey);

    const config = {
      method: 'post',
      url: alimtalkUrl,
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
      senderCenter,
      templateType,
      templateCode,
      title,
      contents,
      callback: '',
      sendCode,
      state: 0,
      result: '발송시도',
      resultCode: '0000',
    });

    return resApi;
  }
}
