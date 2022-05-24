import { Controller, Get } from '@nestjs/common';
import { DtoService } from './dto.service';

@Controller('dto')
export class DtoController {
  constructor(private readonly dtoService: DtoService) {}

  @Get('findConfig')
  async findAllConfig(): Promise<any> {
    return await this.dtoService.findAllConfig();
  }

  @Get('findTemplate')
  async findAllTemplate(): Promise<any> {
    return await this.dtoService.findAllTemplate();
  }

  @Get('findMsgLog')
  async findAllMsgLog(): Promise<any> {
    return await this.dtoService.findAllMsgLog();
  }
}
