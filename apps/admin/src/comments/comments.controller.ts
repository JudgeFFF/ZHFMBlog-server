import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('文章评论模块')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Delete('deleteComment/:id')
  @ApiOperation({ summary: '评论删除' })
  async deleteComment(@Param('id') id: string) {
    return await this.commentsService.deleteComment(id);
  }

  @Delete('deleteCommentAll/:ids')
  @ApiOperation({ summary: '评论批量删除' })
  async deleteCommentAll(@Param('ids') id: string) {
    return await this.commentsService.deleteCommentAll(id);
  }

  @Get('getCommentById/:id')
  @ApiOperation({ summary: '获取评论信息' })
  async getCommentById(@Param('id') id: string) {
    return await this.commentsService.findCommentById(id);
  }

  @Get('getCommentCountByArticleAdmin')
  @ApiOperation({ summary: '获取评论管理员文章数量' })
  async getCommentCountByArticleAdmin() {
    return await this.commentsService.findCommentCountByArticleAdmin();
  }

  @Get('getCommentCountByArticleUser')
  @ApiOperation({ summary: '获取评论用户文章数量' })
  async getCommentCountByArticleUser() {
    return await this.commentsService.findCommentCountByArticleUser();
  }

  @Get('getCommentList')
  @ApiOperation({ summary: '获取评论列表' })
  async getCommentList() {
    return await this.commentsService.findCommentAll();
  }

  @Get('getCommentListByArticleAdmin')
  @ApiOperation({ summary: '获取评论管理员文章列表' })
  async getCommentListByArticleAdmin() {
    return await this.commentsService.findCommentAllByArticleAdmin();
  }

  @Get('getCommentListByArticleUser')
  @ApiOperation({ summary: '获取评论用户文章列表' })
  async getCommentListByArticleUser() {
    return await this.commentsService.findCommentAllByArticleUser();
  }

  @Get('getCommentArticleUserListByUsername/:username')
  @ApiOperation({ summary: '获取评论用户文章评论用户列表' })
  async getCommentArticleUserListByUsername(
    @Param('username') username: string,
  ) {
    return await this.commentsService.findCommentArticleUserAllByUsername(
      username,
    );
  }

  @Get('getCommentListByUsername/:username')
  @ApiOperation({ summary: '获取评论用户列表' })
  async getCommentListByUsername(@Param('username') username: string) {
    return await this.commentsService.findCommentAllByUsername(username);
  }

  @Get('getCommentArticleAdminListByCTitle/:cTitle')
  @ApiOperation({ summary: '获取评论管理员标题列表' })
  async getCommentArticleAdminListByCTitle(@Param('cTitle') cTitle: string) {
    return await this.commentsService.findCommentArticleAdminAllByCTitle(
      cTitle,
    );
  }

  @Get('getCommentArticleUserListByCTitle/:cTitle')
  @ApiOperation({ summary: '获取评论用户标题列表' })
  async getCommentArticleUserListByCTitle(@Param('cTitle') cTitle: string) {
    return await this.commentsService.findCommentArticleUserAllByCTitle(cTitle);
  }
}
