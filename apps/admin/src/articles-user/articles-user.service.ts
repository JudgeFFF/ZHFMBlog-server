import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { ArticleUser } from 'libs/models/articleUser.model';
import { InjectModel } from 'nestjs-typegoose';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class ArticlesUserService {
  private response: Response;

  constructor(
    @InjectModel(ArticleUser)
    private readonly ArticleUserModel: ReturnModelType<typeof ArticleUser>,
    private readonly statisticsService: StatisticsService,
  ) {}

  async addArticleUser(article: ArticleUser) {
    const title: string = article.title;
    return await this.findArticleUserByTitle(title)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '用户文章标题已存在',
          };
          throw this.response;
        }
      })
      .then(() => {
        try {
          const createArticleUser = new this.ArticleUserModel(article);
          const statisticInfo: any = {
            type: 'ArticleUser',
            objectId: String(createArticleUser._id),
          };
          this.statisticsService
            .setStatistic(statisticInfo)
            .then(async (res) => {
              createArticleUser.statistic = res;
              await createArticleUser.save();
            });
          this.response = {
            code: 0,
            msg: '用户文章发布成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户文章发布失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteArticleUser(id: string) {
    return await this.ArticleUserModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '用户文章删除成功',
      };
      return this.response;
    });
  }

  async deleteArticleUserAll(id: string) {
    const ids = id.split(',');
    return await this.ArticleUserModel.remove({ _id: { $in: ids } }).then(
      () => {
        this.response = {
          code: 0,
          msg: '用户文章批量删除成功',
        };
        return this.response;
      },
    );
  }

  async updateArticleUser(id: string, article: ArticleUser) {
    return await this.ArticleUserModel.findByIdAndUpdate(id, {
      title: article.title,
      tag: article.tag,
      cover: article.cover,
      introduce: article.introduce,
      content: article.content,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '用户文章修改成功',
      };
      return this.response;
    });
  }

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

  async findArticleUserByTitle(title: string) {
    return await this.ArticleUserModel.findOne({ title });
  }

  async findArticleUserCount() {
    const count = await this.ArticleUserModel.countDocuments();

    return {
      data: count,
    };
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
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户名文章列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名文章列表不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findArticleUserTitleAllByUsername(username: string, title: string) {
    return await this.ArticleUserModel.find({ title: { $regex: title } })
      .populate({ path: 'user', match: { username } })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户名文章名称列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名文章名称不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findArticleUserAllByTitle(title: string) {
    return await this.ArticleUserModel.find({ title: { $regex: title } })
      .populate({
        path: 'tag',
      })
      .populate({
        path: 'statistic',
        match: { type: 'ArticleUser' },
      })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户文章标题成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户文章标题不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
