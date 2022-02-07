import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Region } from 'libs/models/region.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class RegionsService {
  private response: Response;

  constructor(
    @InjectModel(Region)
    private readonly RegionModel: ReturnModelType<typeof Region>,
  ) {}

  async findRegionAll() {
    return await this.RegionModel.find().then((res) => {
      this.response = {
        code: 0,
        msg: '获取文章地区列表成功',
        data: res,
      };
      return this.response;
    });
  }
}
