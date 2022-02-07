import { Injectable } from '@nestjs/common';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { ArticleAdmin } from 'libs/models/articleAdmin.model';
import { InjectModel } from 'nestjs-typegoose';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class ArticlesAdminService {
  private response: Response;

  constructor(
    @InjectModel(ArticleAdmin)
    private readonly ArticleAdminModel: ReturnModelType<typeof ArticleAdmin>,
    private readonly statisticsService: StatisticsService,
  ) {}

  async addArticleAdmin(article: ArticleAdmin) {
    const title: string = article.title;
    return await this.findArticleAdminByTitle(title)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '管理员文章标题已存在',
          };
          throw this.response;
        }
      })
      .then(() => {
        try {
          const createArticleAdmin = new this.ArticleAdminModel(article);
          const createStatistic: any = {
            type: 'ArticleAdmin',
            objectId: String(createArticleAdmin._id),
          };
          this.statisticsService
            .setStatistic(createStatistic)
            .then(async (res) => {
              createArticleAdmin.statistic = res;
              await createArticleAdmin.save();
            });
          this.response = {
            code: 0,
            msg: '管理员文章发布成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '管理员文章发布失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteArticleAdmin(id: string) {
    return await this.ArticleAdminModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '管理员文章删除成功',
      };
      return this.response;
    });
  }

  async deleteArticleAdminAll(id: string) {
    const ids = id.split(',');
    return await this.ArticleAdminModel.remove({ _id: { $in: ids } }).then(
      () => {
        this.response = {
          code: 0,
          msg: '管理员文章批量删除成功',
        };
        return this.response;
      },
    );
  }

  async updateArticleAdmin(id: string, article: ArticleAdmin) {
    return await this.ArticleAdminModel.findByIdAndUpdate(id, {
      title: article.title,
      region: article.region,
      tag: article.tag,
      cover: article.cover,
      introduce: article.introduce,
      content: article.content,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '管理员文章修改成功',
      };
      return this.response;
    });
  }

  async findArticleAdminById(id: string) {
    return await this.ArticleAdminModel.findById(id)
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

  async findArticleAdminByTitle(title: string) {
    return await this.ArticleAdminModel.findOne({ title });
  }

  async findArticleAdminCount() {
    const count = await this.ArticleAdminModel.countDocuments();

    return {
      data: count,
    };
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
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取管理员文章标题成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '管理员文章标题不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findArticleAdminAllByRegion(region: string) {
    return await this.ArticleAdminModel.find({ region })
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
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取文章地区成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '文章地区不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
