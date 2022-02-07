import { Injectable } from '@nestjs/common';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { ArticleUser } from 'libs/models/articleUser.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ArticlesUserService {
  private response: Response;

  constructor(
    @InjectModel(ArticleUser)
    private readonly ArticleUserModel: ReturnModelType<typeof ArticleUser>,
  ) {}

  async findArticleUserById(id: string) {
    return await this.ArticleUserModel.findById(id)
      .populate({ path: 'user' })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser', objectId: id },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章信息成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleUserAllById(id: string) {
    const data = id.split(',');
    const ids = [];
    for (let item of data) {
      ids.push(new mongoose.Types.ObjectId(item));
    }
    return await this.ArticleUserModel.find({ _id: { $in: ids } })
      .populate({ path: 'user' })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取收藏用户文章信息成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleUserAllByTitle(title: string) {
    return await this.ArticleUserModel.find({ title: { $regex: title } })
      .populate({ path: 'user' })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章标题列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleUserAllByUsername(username: string) {
    return await this.ArticleUserModel.find()
      .populate({ path: 'user', match: { username } })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章用户名列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleUserAll() {
    return await this.ArticleUserModel.find()
      .populate({ path: 'user' })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章列表成功',
          data: res,
        };
        return this.response;
      });
  }
}
