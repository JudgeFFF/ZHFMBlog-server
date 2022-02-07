import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Comment } from 'libs/models/comment.model';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('文章评论模块')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('addComment')
  @ApiOperation({ summary: '评论添加' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addComment(@Body() commentDto: Comment, @Req() req) {
    commentDto.user = req.user.data;
    return await this.commentsService.addComment(commentDto);
  }

  @Get('getCommentListByArticleAdmin/:objectId')
  @ApiOperation({ summary: '获取评论管理员文章列表' })
  async getCommentListByArticleAdmin(@Param('objectId') objectId: string) {
    return await this.commentsService.findCommentAllByArticleAdmin(objectId);
  }

  @Get('getCommentListByArticleUser/:objectId')
  @ApiOperation({ summary: '获取评论用户文章列表' })
  async getCommentListByArticleUser(@Param('objectId') objectId: string) {
    return await this.commentsService.findCommentAllByArticleUser(objectId);
  }
}
