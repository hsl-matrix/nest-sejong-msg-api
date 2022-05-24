import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { RediCacheService } from './redi-cache.service';
@Controller('redi-cache')
export class RediCacheController {
  constructor(private readonly rediCacheService: RediCacheService) {}
  @Get('setCache')
  async setCache(@Query() queryString): Promise<any> {
    const { key, value } = queryString;
    return await this.rediCacheService.setCache(key, value);
  }

  @Post('setCache')
  async setPostCache(@Req() req): Promise<any> {
    const { body = {} } = req;
    const { key = null, value = null } = body;
    if (!key) return { rtn: 'error key or value' };
    return await this.rediCacheService.setCache(key, value);
  }

  @Get('getCache')
  async getCache(@Query() queryString): Promise<any> {
    const { key } = queryString;
    return await this.rediCacheService.getCache(key);
  }
}
