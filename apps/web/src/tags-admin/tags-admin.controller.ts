import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagsAdminService } from './tags-admin.service';

@Controller('tags-admin')
@ApiTags('管理员标签模块')
export class TagsAdminController {
  constructor(private readonly tagsAdminService: TagsAdminService) {}

  @Get('getTagAdminList')
  @ApiOperation({ summary: '获取管理员标签列表' })
  async getTagAdminList() {
    return await this.tagsAdminService.findTagAdminAll();
  }
}
