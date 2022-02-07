import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesUserService } from './articles-user.service';

@Controller('articles-user')
@ApiTags('用户文章模块')
export class ArticlesUserController {
  constructor(private readonly articleUsersService: ArticlesUserService) {}

  @Get('getArticleUserById/:id')
  @ApiOperation({ summary: '获取用户文章信息' })
  async getArticleUserById(@Param('id') id: string) {
    return await this.articleUsersService.findArticleUserById(id);
  }

  @Get('getArticleUserListById/:ids')
  @ApiOperation({ summary: '获取收藏用户文章信息' })
  async getArticleUserListById(@Param('ids') id: string) {
    return await this.articleUsersService.findArticleUserAllById(id);
  }

  @Get('getArticleUserListByTitle/:title')
  @ApiOperation({ summary: '获取用户文章标题列表' })
  async getArticleUserListByTitle(@Param('title') title: string) {
    return await this.articleUsersService.findArticleUserAllByTitle(title);
  }

  @Get('getArticleUserListByUsername/:username')
  @ApiOperation({ summary: '获取用户文章用户名列表' })
  async getArticleUserListByUsername(@Param('username') username: string) {
    return await this.articleUsersService.findArticleUserAllByUsername(username);
  }

  @Get('getArticleUserList')
  @ApiOperation({ summary: '获取用户文章列表' })
  async getArticleUserList() {
    return await this.articleUsersService.findArticleUserAll();
  }
}
