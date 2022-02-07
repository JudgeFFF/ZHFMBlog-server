import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionsService } from './regions.service';

@Controller('regions')
@ApiTags('文章地区模块')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('getRegionList')
  @ApiOperation({ summary: '获取地区列表' })
  async getRegionList() {
    return await this.regionsService.findRegionAll();
  }
}
