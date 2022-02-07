import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Statistic } from 'libs/models/statistic.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class StatisticsService {
  private response: Response;

  constructor(
    @InjectModel(Statistic)
    private readonly StatisticModel: ReturnModelType<typeof Statistic>,
  ) {}

  async setStatistic(statistic: Statistic) {
    statistic.sRate = 0;
    statistic.sCollect = 0;
    statistic.sView = 0;
    statistic.sComment = 0;
    const CreateStatistic = new this.StatisticModel(statistic);
    await CreateStatistic.save();

    return CreateStatistic._id;
  }

  async findStatisticViewAllByArticleAdmin() {
    return await this.StatisticModel.find()
      .where({ type: 'ArticleAdmin' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取管理员文章浏览数据列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findStatisticViewAllByArticleUser() {
    return await this.StatisticModel.find()
      .where({ type: 'ArticleUser' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章浏览数据列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findStatisticAccessAll() {
    return await this.StatisticModel.findOne({
      sAccess: { $exists: true },
    }).then((res) => {
      this.response = {
        code: 0,
        msg: '获取访问数据列表成功',
        data: res,
      };
      return this.response;
    });
  }

  async findStatisticArticleAdminAllByView() {
    return await this.StatisticModel.find()
      .populate({
        path: 'objectId',
        populate: { path: 'region' },
      })
      .where({ type: 'ArticleAdmin' })
      .sort({ sView: -1 })
      .limit(5)
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取管理员文章访问列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findStatisticArticleUserAllByView() {
    return await this.StatisticModel.find()
      .populate({
        path: 'objectId',
      })
      .where({ type: 'ArticleUser' })
      .sort({ sView: -1 })
      .limit(5)
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户文章访问列表成功',
          data: res,
        };
        return this.response;
      });
  }
}
