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
import { ArticleAdmin } from 'libs/models/articleAdmin.model';
import { ArticlesAdminService } from './articles-admin.service';

@Controller('articles-admin')
@ApiTags('管理员文章模块')
export class ArticlesAdminController {
  constructor(private readonly articleAdminsService: ArticlesAdminService) {}

  @Post('addArticleAdmin')
  @ApiOperation({ summary: '管理员文章添加' })
  async addArticleAdmin(@Body() articleUserDto: ArticleAdmin) {
    return await this.articleAdminsService.addArticleAdmin(articleUserDto);
  }

  @Delete('deleteArticleAdmin/:id')
  @ApiOperation({ summary: '管理员文章删除' })
  async deleteArticleAdmin(@Param('id') id: string) {
    return await this.articleAdminsService.deleteArticleAdmin(id);
  }

  @Delete('deleteArticleAdminAll/:ids')
  @ApiOperation({ summary: '管理员文章批量删除' })
  async deleteArticleAdminAll(@Param('ids') id: string) {
    return await this.articleAdminsService.deleteArticleAdminAll(id);
  }

  @Put('updateArticleAdmin/:id')
  @ApiOperation({ summary: '管理员文章编辑' })
  async updateArticleAdmin(
    @Param('id') id: string,
    @Body() articleUserDto: ArticleAdmin,
  ) {
    return await this.articleAdminsService.updateArticleAdmin(
      id,
      articleUserDto,
    );
  }

  @Get('getArticleAdminById/:id')
  @ApiOperation({ summary: '获取管理员文章信息' })
  async getArticleAdminById(@Param('id') id: string) {
    return await this.articleAdminsService.findArticleAdminById(id);
  }

  @Get('getArticleAdminCount')
  @ApiOperation({ summary: '获取管理员文章数量' })
  async getArticleAdminCount() {
    return await this.articleAdminsService.findArticleAdminCount();
  }

  @Get('getArticleAdminList')
  @ApiOperation({ summary: '获取管理员文章列表' })
  async getArticleAdminList() {
    return await this.articleAdminsService.findArticleAdminAll();
  }

  @Get('getArticleAdminListByTitle/:title')
  @ApiOperation({ summary: '获取管理员文章标题' })
  async getArticleAdminListByTitle(@Param('title') title: string) {
    return await this.articleAdminsService.findArticleAdminAllByTitle(title);
  }

  @Get('getArticleAdminListByRegion/:region')
  @ApiOperation({ summary: '获取管理员文章地区' })
  async getArticleAdminListByRegion(@Param('region') region: string) {
    return await this.articleAdminsService.findArticleAdminAllByRegion(region);
  }
}
