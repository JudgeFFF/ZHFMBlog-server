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

  async addRegion(region: Region) {
    const rName: string = region.rName;
    return await this.findRegionByRName(rName)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '文章地区已存在',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createRegion = new this.RegionModel(region);
          await createRegion.save();
          this.response = {
            code: 0,
            msg: '文章地区创建成功',
            data: createRegion,
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '文章地区创建失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteRegion(id: string) {
    return await this.RegionModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '文章地区删除成功',
      };
      return this.response;
    });
  }

  async deleteRegionAll(id: string) {
    const ids = id.split(',');
    return await this.RegionModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '文章地区批量删除成功',
      };
      return this.response;
    });
  }

  async updateRegion(id: string, region: Region) {
    return await this.RegionModel.findByIdAndUpdate(id, {
      rName: region.rName,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '文章地区修改成功',
      };
      return this.response;
    });
  }

  async findRegionById(id: string) {
    return await this.RegionModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取文章地区信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findRegionByRName(rName: string) {
    return await this.RegionModel.findOne({ rName });
  }

  async findRegionCount() {
    const count = await this.RegionModel.countDocuments();

    return {
      data: count,
    };
  }

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

  async findRegionAllByRName(rName: string) {
    return await this.RegionModel.find({ rName: { $regex: rName } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取文章地区名称成功',
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
