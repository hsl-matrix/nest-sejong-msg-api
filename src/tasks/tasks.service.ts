import { Injectable, Logger } from '@nestjs/common';
import { RediCacheService } from 'src/redi-cache/redi-cache.service';
import { ApisService } from 'src/apis/apis.service';
import { Cron } from '@nestjs/schedule';
import { DtoService } from 'src/dto/dto.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private rediCacheService: RediCacheService,
    private apisService: ApisService,
    private dtoService: DtoService,
  ) {}

  // 병렬 처리
  async fnSjResult(sendCode) {
    // 센터 없음 Exception 추가
    const url = `https://apimsg.wideshot.co.kr/api/v1/message/result?sendCode=${sendCode}`;

    const config = {
      method: 'get',
      headers: {
        sejongApiKey:
          'cjlLYUxWcnNLSVhXQVlCaTk2d3VVSHR2MG5xckRCUUZGanBsTzhNc1FEMWVvSXNETENRZ09iRFY0eWVuZitwNQ==',
      },
    };

    const sjResult = await this.apisService.apiGet(url, config);

    if (sjResult && sjResult.data) {
      console.log('sjResult  = ', sjResult.data);
      const { data = null, code = null, message = null } = sjResult.data;

      let paramResult = null;
      let paramResultCode = null;

      paramResult = message;
      paramResultCode = code;

      if (data) {
        const { resultCode = {} } = data;
        paramResult = null;
        paramResultCode = resultCode;
      }

      const sjCode = await this.rediCacheService.getCache('sjCode');
      const jsonSjCode = JSON.parse(sjCode);

      const findRstCodeObj = jsonSjCode.find(
        (sc) => sc.code === paramResultCode,
      );
      console.log('findRstCodeObj  = ', findRstCodeObj, paramResult);
      this.dtoService.msgLogResultUpdate({
        sendCode,
        result: !paramResult ? findRstCodeObj['codeResult'] : paramResult,
        resultCode: paramResultCode,
      });
    }

    return sjResult.data;
  }

  // 병렬 처리
  async sjResultParallel(sendCodeMap) {
    console.log('all  sjResultParallel start ');

    const promises = sendCodeMap.map((sendCode) => {
      return this.fnSjResult(sendCode);
    });

    await Promise.all(promises);
    console.log('all sjResultParallel done ');
  }

  @Cron('*/50 * * * * *')
  async handleCron() {
    this.logger.log('Called every 50 seconds handleCron');
    const finsMsgLog = await this.dtoService.findResultMsgLog();

    const sendCodeMap = finsMsgLog.map((ml) => ml.sendCode);
    console.log(' sendCodeMap = ', sendCodeMap);
    this.sjResultParallel(sendCodeMap);
  }
}
