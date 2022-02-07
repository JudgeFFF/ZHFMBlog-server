import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Region } from 'libs/models/region.model';
import { RegionsService } from './regions.service';

@Controller('regions')
@ApiTags('文章地区模块')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post('addRegion')
  @ApiOperation({ summary: '地区添加' })
  async addRegion(@Body() regionDto: Region) {
    return await this.regionsService.addRegion(regionDto);
  }

  @Delete('deleteRegion/:id')
  @ApiOperation({ summary: '地区删除' })
  async deleteRegion(@Param('id') id: string) {
    return await this.regionsService.deleteRegion(id);
  }

  @Delete('deleteRegionAll/:ids')
  @ApiOperation({ summary: '地区批量删除' })
  async deleteRegionAll(@Param('ids') id: string) {
    return await this.regionsService.deleteRegionAll(id);
  }

  @Put('updateRegion/:id')
  @ApiOperation({ summary: '地区编辑' })
  async updateRegion(@Param('id') id: string, @Body() regionDto: Region) {
    return await this.regionsService.updateRegion(id, regionDto);
  }

  @Get('getRegionById/:id')
  @ApiOperation({ summary: '获取地区信息' })
  async getRegionById(@Param('id') id: string) {
    return await this.regionsService.findRegionById(id);
  }

  @Get('getRegionCount')
  @ApiOperation({ summary: '获取地区数量' })
  async getRegionCount() {
    return await this.regionsService.findRegionCount();
  }

  @Get('getRegionList')
  @ApiOperation({ summary: '获取地区列表' })
  async getRegionList() {
    return await this.regionsService.findRegionAll();
  }

  @Get('getRegionListByRName/:rName')
  @ApiOperation({ summary: '获取文章地区' })
  async getRegionListByRName(@Param('rName') rName: string) {
    return await this.regionsService.findRegionAllByRName(rName);
  }
}
