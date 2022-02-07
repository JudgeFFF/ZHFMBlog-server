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
import { TagAdmin } from 'libs/models/tagAdmin.model';
import { TagsAdminService } from './tags-admin.service';

@Controller('tags-admin')
@ApiTags('管理员标签模块')
export class TagsAdminController {
  constructor(private readonly tagsAdminService: TagsAdminService) {}

  @Post('addTagAdmin')
  @ApiOperation({ summary: '管理员标签添加' })
  async addTagAdmin(@Body() tagAdminDto: TagAdmin) {
    return await this.tagsAdminService.addTagAdmin(tagAdminDto);
  }

  @Delete('deleteTagAdmin/:id')
  @ApiOperation({ summary: '管理员标签删除' })
  async deleteTagAdmin(@Param('id') id: string) {
    return await this.tagsAdminService.deleteTagAdmin(id);
  }

  @Delete('deleteTagAdminAll/:ids')
  @ApiOperation({ summary: '管理员标签批量删除' })
  async deleteTagAdminAll(@Param('ids') id: string) {
    return await this.tagsAdminService.deleteTagAdminAll(id);
  }

  @Put('updateTagAdmin/:id')
  @ApiOperation({ summary: '管理员标签编辑' })
  async updateTagAdmin(@Param('id') id: string, @Body() tagAdminDto: TagAdmin) {
    return await this.tagsAdminService.updateTagAdmin(id, tagAdminDto);
  }

  @Get('getTagAdminById/:id')
  @ApiOperation({ summary: '获取管理员标签信息' })
  async getTagAdminById(@Param('id') id: string) {
    return await this.tagsAdminService.findTagAdminById(id);
  }

  @Get('getTagAdminCount')
  @ApiOperation({ summary: '获取管理员标签数量' })
  async getTagAdminCount() {
    return await this.tagsAdminService.findTagAdminCount();
  }

  @Get('getTagAdminList')
  @ApiOperation({ summary: '获取管理员标签列表' })
  async getTagAdminList() {
    return await this.tagsAdminService.findTagAdminAll();
  }

  @Get('getTagAdminListByTName/:tName')
  @ApiOperation({ summary: '获取管理员标签名称' })
  async getTagAdminListByTName(@Param('tName') tName: string) {
    return await this.tagsAdminService.findTagAdminAllByTName(tName);
  }

  @Get('getTagAdminListByColor/:color')
  @ApiOperation({ summary: '获取标签颜色' })
  async getTagAdminListByColor(@Param('color') color: string) {
    return await this.tagsAdminService.findTagAdminAllByColor(color);
  }
}
