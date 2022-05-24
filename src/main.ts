import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RediCacheService } from './redi-cache/redi-cache.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const rediCacheService = app.get(RediCacheService);
  //SMS 정보 호출.
  await rediCacheService.setTalkInfoCache();
  await app.listen(3600);
}
bootstrap();
