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

  async deleteComment(id: string) {
    return await this.CommentModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '评论删除成功',
      };
      return this.response;
    });
  }

  async deleteCommentAll(id: string) {
    const ids = id.split(',');
    return await this.CommentModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '评论批量删除成功',
      };
      return this.response;
    });
  }

  async findCommentById(id: string) {
    return await this.CommentModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取评论信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findCommentCountByArticleAdmin() {
    const count = await this.CommentModel.countDocuments().where({
      type: 'ArticleAdmin',
    });

    return {
      data: count,
    };
  }

  async findCommentCountByArticleUser() {
    const count = await this.CommentModel.countDocuments().where({
      type: 'ArticleUser',
    });

    return {
      data: count,
    };
  }

  async findCommentAll() {
    return await this.CommentModel.find()
      .populate({ path: 'user', select: 'username' })
      .populate({
        path: 'objectId',
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取评论列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findCommentAllByArticleAdmin() {
    return await this.CommentModel.find()
      .populate('user')
      .populate({
        path: 'objectId',
      })
      .where({ type: 'ArticleAdmin' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取评论管理员文章列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findCommentAllByArticleUser() {
    return await this.CommentModel.find()
      .populate('user')
      .populate({
        path: 'objectId',
      })
      .where({ type: 'ArticleUser' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取评论用户文章列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findCommentArticleUserAllByUsername(username: string) {
    return await this.CommentModel.find()
      .populate('user')
      .populate({
        path: 'objectId',
        populate: { path: 'user', select: 'username', match: { username } },
      })
      .where({ type: 'ArticleUser' })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取评论用户文章评论用户列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '评论用户文章评论用户列表不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findCommentAllByUsername(username: string) {
    return await this.CommentModel.find()
      .populate({
        path: 'user',
        select: 'username',
        match: { username: { $regex: username } },
      })
      .populate({
        path: 'objectId',
      })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取评论用户列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '评论用户不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findCommentArticleAdminAllByCTitle(cTitle: string) {
    return await this.CommentModel.find()
      .populate('user')
      .populate({
        path: 'objectId',
        match: { title: { $regex: cTitle } },
      })
      .where({ type: 'ArticleAdmin' })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取评论管理员标题列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '评论管理员标题不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findCommentArticleUserAllByCTitle(cTitle: string) {
    return await this.CommentModel.find()
      .populate('user')
      .populate({
        path: 'objectId',
        match: { title: { $regex: cTitle } },
      })
      .where({ type: 'ArticleUser' })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取评论用户标题列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '评论用户标题不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
