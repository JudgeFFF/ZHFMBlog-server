import { Injectable } from '@nestjs/common';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { ArticleAdmin } from 'libs/models/articleAdmin.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ArticlesAdminService {
  private response: Response;

  constructor(
    @InjectModel(ArticleAdmin)
    private readonly ArticleAdminModel: ReturnModelType<typeof ArticleAdmin>,
  ) {}

  async findArticleAdminById(id: string) {
    return await this.ArticleAdminModel.findById(id)
      .populate({
        path: 'region',
      })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleAdmin', objectId: id },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取管理员文章信息成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleAdminAllById(id: string) {
    const data = id.split(',');
    const ids = [];
    for (let item of data) {
      ids.push(new mongoose.Types.ObjectId(item));
    }
    return await this.ArticleAdminModel.find({ _id: { $in: ids } })
      .populate({
        path: 'region',
      })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleAdmin' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取收藏管理员文章信息成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleAdminAllByTitle(title: string) {
    return await this.ArticleAdminModel.find({ title: { $regex: title } })
      .populate({
        path: 'region',
      })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleAdmin' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取管理员文章标题列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findArticleAdminAll() {
    return await this.ArticleAdminModel.find()
      .populate({
        path: 'region',
      })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleAdmin' },
      })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取管理员文章列表成功',
          data: res,
        };
        return this.response;
      });
  }
}
