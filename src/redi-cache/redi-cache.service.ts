import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DtoService } from 'src/dto/dto.service';

@Injectable()
export class RediCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly dtoService: DtoService,
  ) {}

  async getCache(key: string): Promise<string> {
    const cacheData = await this.cacheManager.get<string>(key);

    return cacheData;
  }

  async setCache(key, value, ttl = 0) {
    await this.cacheManager.set<string>(key, value, {
      ttl,
    });
  }

  async setTalkInfoCache() {
    const sjConfig = await this.dtoService.findAllConfig();
    const jsonSjConfig = JSON.stringify(sjConfig);
    await this.cacheManager.set<string>('sjConfig', jsonSjConfig, {
      ttl: 0,
    });

    const template = await this.dtoService.findAllTemplate();
    const jsonTemplate = JSON.stringify(template);
    await this.cacheManager.set<string>('template', jsonTemplate, {
      ttl: 0,
    });

    const sjCode = await this.dtoService.findAllSjCode();
    const jsonSjCode = JSON.stringify(sjCode);
    await this.cacheManager.set<string>('sjCode', jsonSjCode, {
      ttl: 0,
    });
  }
}
