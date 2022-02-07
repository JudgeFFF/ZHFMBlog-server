import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagsUserService } from './tags-user.service';

@Controller('tags-user')
@ApiTags('用户标签模块')
export class TagsUserController {
  constructor(private readonly tagsUserService: TagsUserService) {}

  @Get('getTagUserList')
  @ApiOperation({ summary: '获取用户标签列表' })
  async getTagUserList() {
    return await this.tagsUserService.findTagUserAll();
  }
}
