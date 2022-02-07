import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesAdminService } from './articles-admin.service';

@Controller('articles-admin')
@ApiTags('管理员文章模块')
export class ArticlesAdminController {
  constructor(private readonly articleAdminsService: ArticlesAdminService) {}

  @Get('getArticleAdminById/:id')
  @ApiOperation({ summary: '获取管理员文章信息' })
  async getArticleAdminById(@Param('id') id: string) {
    return await this.articleAdminsService.findArticleAdminById(id);
  }

  @Get('getArticleAdminListById/:ids')
  @ApiOperation({ summary: '获取收藏管理员文章信息' })
  async getArticleAdminListById(@Param('ids') id: string) {
    return await this.articleAdminsService.findArticleAdminAllById(id);
  }

  @Get('getArticleAdminListByTitle/:title')
  @ApiOperation({ summary: '获取管理员文章标题列表' })
  async getArticleAdminListByTitle(@Param('title') title: string) {
    return await this.articleAdminsService.findArticleAdminAllByTitle(title);
  }

  @Get('getArticleAdminList')
  @ApiOperation({ summary: '获取管理员文章列表' })
  async getArticleAdminList() {
    return await this.articleAdminsService.findArticleAdminAll();
  }
}
