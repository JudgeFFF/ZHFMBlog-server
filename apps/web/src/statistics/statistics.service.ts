import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Statistic } from 'libs/models/statistic.model';
import { InjectModel } from 'nestjs-typegoose';
import { ActionsService } from '../actions/actions.service';

@Injectable()
export class StatisticsService {
  private response: Response;

  constructor(
    @InjectModel(Statistic)
    private readonly StatisticModel: ReturnModelType<typeof Statistic>,
    private readonly ActionsService: ActionsService,
  ) {}

  async setRateStatistic(statistic: Statistic) {
    const { type, objectId, sRate } = statistic;
    const res: any = await this.StatisticModel.findOne().where({
      type,
      objectId,
    });
    const rate =
      res.sComment == 0 ? sRate : (res.sRate + sRate);

    return await this.StatisticModel.findByIdAndUpdate(res._id, {
      sRate: rate,
    });
  }

  async setCollectStatistic(statistic: Statistic) {
    const { type, objectId } = statistic;
    const res: any = await this.StatisticModel.findOne().where({
      type,
      objectId,
    });
    const collect = await this.ActionsService.getCollectCount(statistic);

    return await this.StatisticModel.findByIdAndUpdate(res._id, {
      sCollect: collect,
    });
  }

  async setViewStatistic(statistic: Statistic) {
    const { type, objectId } = statistic;
    const res: any = await this.StatisticModel.findOne().where({
      type,
      objectId,
    });
    const view = res.sView;

    return await this.StatisticModel.findByIdAndUpdate(res._id, {
      sView: view + 1,
    });
  }

  async setCommentStatistic(statistic: Statistic) {
    const { type, objectId, sComment } = statistic;
    const res: any = await this.StatisticModel.findOne().where({
      type,
      objectId,
    });
    const comment = sComment;

    return await this.StatisticModel.findByIdAndUpdate(res._id, {
      sComment: comment,
    });
  }

  async setAccessStatistic() {
    const res: any = await this.StatisticModel.findOne({
      sAccess: { $exists: true },
    });
    if (res) {
      const access = res.sAccess;
      return await this.StatisticModel.findByIdAndUpdate(res._id, {
        sAccess: access + 1,
      });
    } else {
      const statistic = { sAccess: 0 };
      const createStatistic = new this.StatisticModel(statistic);
      return await createStatistic.save();
    }
  }

  async findStatisticAllByRate(type: string) {
    return await this.StatisticModel.find()
      .populate({
        path: 'objectId',
      })
      .where({ type })
      .sort({ sRate: -1 })
      .limit(5)
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取文章评分列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findStatisticAllByView(type: string) {
    return await this.StatisticModel.find()
      .populate({
        path: 'objectId',
      })
      .where({ type })
      .sort({ sView: -1 })
      .limit(5)
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取文章访问列表成功',
          data: res,
        };
        return this.response;
      });
  }
}
