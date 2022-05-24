import { Controller, Get } from '@nestjs/common';
import { ApisService } from 'src/apis/apis.service';
import { RediCacheService } from 'src/redi-cache/redi-cache.service';
import { TasksService } from './tasks.service';
import * as qs from 'qs';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly apisService: ApisService,
    private readonly rediCacheService: RediCacheService,
  ) {}
}
