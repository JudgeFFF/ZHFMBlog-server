import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Action } from 'libs/models/action.model';
import { Statistic } from 'libs/models/statistic.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ActionsService {
  private response: Response;

  constructor(
    @InjectModel(Action)
    private readonly ActionModel: ReturnModelType<typeof Action>,
  ) {}

  async getCollectStatus(collectInfo: Action) {
    const count = await this.ActionModel.countDocuments(collectInfo);

    return {
      status: count > 0,
    };
  }

  async findCollectArticleAdminAllByUsername(username: string) {
    return await this.ActionModel.find()
      .populate({ path: 'user', select: 'username', match: { username } })
      .where({ type: 'ArticleAdmin' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取收藏管理员文章列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findCollectArticleUserAllByUsername(username: string) {
    return await this.ActionModel.find()
      .populate({ path: 'user', select: 'username', match: { username } })
      .where({ type: 'ArticleUser' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取收藏用户文章列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async getCollectCount(statisticInfo: Statistic) {
    const { type, objectId } = statisticInfo;
    const count = await this.ActionModel.countDocuments().where({
      type,
      objectId,
    });

    return count;
  }
}
