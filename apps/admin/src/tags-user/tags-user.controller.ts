import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TagUser } from 'libs/models/tagUser.model';
import { TagsUserService } from './tags-user.service';

@Controller('tags-user')
@ApiTags('用户标签模块')
export class TagsUserController {
  constructor(private readonly tagsUserService: TagsUserService) {}

  @Post('addTagUser')
  @ApiOperation({ summary: '用户标签添加' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addTagUser(@Body() tagUserDto: TagUser, @Req() req) {
    tagUserDto.user = req.user.data;
    return await this.tagsUserService.addTagUser(tagUserDto);
  }

  @Delete('deleteTagUser/:id')
  @ApiOperation({ summary: '用户标签删除' })
  async deleteTagUser(@Param('id') id: string) {
    return await this.tagsUserService.deleteTagUser(id);
  }

  @Delete('deleteTagUserAll/:ids')
  @ApiOperation({ summary: '用户标签批量删除' })
  async deleteTagUserAll(@Param('ids') id: string) {
    return await this.tagsUserService.deleteTagUserAll(id);
  }

  @Put('updateTagUser/:id')
  @ApiOperation({ summary: '用户标签编辑' })
  async updateTagUser(@Param('id') id: string, @Body() tagUserDto: TagUser) {
    return await this.tagsUserService.updateTagUser(id, tagUserDto);
  }

  @Get('getTagUserById/:id')
  @ApiOperation({ summary: '获取用户标签信息' })
  async getTagUserById(@Param('id') id: string) {
    return await this.tagsUserService.findTagUserById(id);
  }

  @Get('getTagUserCount')
  @ApiOperation({ summary: '获取用户标签数量' })
  async getTagUserCount() {
    return await this.tagsUserService.findTagUserCount();
  }

  @Get('getTagUserList')
  @ApiOperation({ summary: '获取用户标签列表' })
  async getTagUserList() {
    return await this.tagsUserService.findTagUserAll();
  }

  @Get('getTagUserListByUsername/:username')
  @ApiOperation({ summary: '获取用户名标签列表' })
  async getTagUserListByUsername(@Param('username') username: string) {
    return await this.tagsUserService.findTagUserAllByUsername(
      username,
    );
  }

  @Get('getTagUserTNameListTitleListByUsername/:username&:tName')
  @ApiOperation({ summary: '获取用户名标签名称列表' })
  async getTagUserTNameListTitleListByUsername(
    @Param('username') username: string,
    @Param('tName') tName: string,
  ) {
    return await this.tagsUserService.findTagUserTNameAllByUsername(
      username,
      tName,
    );
  }

  @Get('getTagUserColorListRegionListByUsername/:username&:color')
  @ApiOperation({ summary: '获取用户名标签颜色列表' })
  async getTagUserColorListRegionListByUsername(
    @Param('username') username: string,
    @Param('color') color: string,
  ) {
    return await this.tagsUserService.findTagUserColorAllByUsername(
      username,
      color,
    );
  }

  @Get('getTagUserListByTName/:tName')
  @ApiOperation({ summary: '获取用户标签名称列表' })
  async getTagUserListByTName(@Param('tName') tName: string) {
    return await this.tagsUserService.findTagUserAllByTName(tName);
  }

  @Get('getTagUserListByColor/:color')
  @ApiOperation({ summary: '获取用户标签颜色列表' })
  async getTagUserListByColor(@Param('color') color: string) {
    return await this.tagsUserService.findTagUserAllByColor(color);
  }
}
