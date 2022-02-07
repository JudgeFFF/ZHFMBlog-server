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
import { ArticleUser } from 'libs/models/articleUser.model';
import { ArticlesUserService } from './articles-user.service';

@Controller('articles-user')
@ApiTags('用户文章模块')
export class ArticlesUserController {
  constructor(private readonly articleUsersService: ArticlesUserService) {}

  @Post('addArticleUser')
  @ApiOperation({ summary: '用户文章添加' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addArticleUser(@Body() articleUserDto: ArticleUser, @Req() req) {
    articleUserDto.user = req.user.data;
    return await this.articleUsersService.addArticleUser(articleUserDto);
  }

  @Delete('deleteArticleUser/:id')
  @ApiOperation({ summary: '用户文章删除' })
  async deleteArticleUser(@Param('id') id: string) {
    return await this.articleUsersService.deleteArticleUser(id);
  }

  @Delete('deleteArticleUserAll/:ids')
  @ApiOperation({ summary: '用户文章批量删除' })
  async deleteArticleUserAll(@Param('ids') id: string) {
    return await this.articleUsersService.deleteArticleUserAll(id);
  }

  @Put('updateArticleUser/:id')
  @ApiOperation({ summary: '用户文章编辑' })
  async updateArticleUser(
    @Param('id') id: string,
    @Body() articleUserDto: ArticleUser,
  ) {
    return await this.articleUsersService.updateArticleUser(id, articleUserDto);
  }

  @Get('getArticleUserById/:id')
  @ApiOperation({ summary: '获取用户文章信息' })
  async getArticleUserById(@Param('id') id: string) {
    return await this.articleUsersService.findArticleUserById(id);
  }

  @Get('getArticleUserCount')
  @ApiOperation({ summary: '获取用户文章数量' })
  async getArticleUserCount() {
    return await this.articleUsersService.findArticleUserCount();
  }

  @Get('getArticleUserList')
  @ApiOperation({ summary: '获取用户文章列表' })
  async getArticleUserList() {
    return await this.articleUsersService.findArticleUserAll();
  }

  @Get('getArticleUserListByUsername/:username')
  @ApiOperation({ summary: '获取用户名文章列表' })
  async getArticleUserListByUsername(@Param('username') username: string) {
    return await this.articleUsersService.findArticleUserAllByUsername(
      username,
    );
  }

  @Get('getArticleUserTitleListByUsername/:username&:title')
  @ApiOperation({ summary: '获取用户名文章名称列表' })
  async getArticleUserTitleListByUsername(
    @Param('username') username: string,
    @Param('title') title: string,
  ) {
    return await this.articleUsersService.findArticleUserTitleAllByUsername(
      username,
      title,
    );
  }

  @Get('getArticleUserListByTitle/:title')
  @ApiOperation({ summary: '获取用户文章标题列表' })
  async getArticleUserListByTitle(@Param('title') title: string) {
    return await this.articleUsersService.findArticleUserAllByTitle(title);
  }
}
