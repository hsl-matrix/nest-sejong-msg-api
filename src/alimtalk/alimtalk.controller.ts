import { Controller, Get, Query } from '@nestjs/common';
import { ApisService } from 'src/apis/apis.service';
import { RediCacheService } from 'src/redi-cache/redi-cache.service';
import { DtoService } from 'src/dto/dto.service';
import { AlimtalkService } from './alimtalk.service';

@Controller('alimtalk')
export class AlimtalkController {
  constructor(
    private readonly apisService: ApisService,
    private readonly rediCacheService: RediCacheService,
    private readonly dtoService: DtoService,
    private readonly alimtalkService: AlimtalkService,
  ) {}

  @Get('sendTalk')
  async sendTalk(@Query() query): Promise<any> {
    const { senderCenter, cutoTel, templateCode } = query;
    // 센터 없음 Exception 추가
    /**
    이가온 님 주문하신 테스트물품 금일 배송 출발하였습니다. 
    */

    const resApi = await this.alimtalkService.fn_send_talk(
      senderCenter,
      templateCode,
      cutoTel,
    );
    console.log('resApi  = ', resApi);

    return resApi;
  }
}
