import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Comment } from 'libs/models/comment.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class CommentsService {
  private response: Response;

  constructor(
    @InjectModel(Comment)
    private readonly CommentModel: ReturnModelType<typeof Comment>,
  ) {}

  async addComment(comment: Comment) {
    const CreateComment = new this.CommentModel(comment);
    return await CreateComment.save().then(() => {
      this.response = {
        code: 0,
        msg: '评论创建成功',
        data: CreateComment,
      };
      return this.response;
    });
  }

  async findCommentAllByArticleAdmin(objectId: string) {
    return await this.CommentModel.find()
      .populate('user')
      .where({ type: 'ArticleAdmin', objectId })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取评论管理员文章列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findCommentAllByArticleUser(objectId: string) {
    return await this.CommentModel.find()
      .populate('user')
      .where({ type: 'ArticleUser', objectId })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取评论用户文章列表成功',
          data: res,
        };
        return this.response;
      });
  }
}
