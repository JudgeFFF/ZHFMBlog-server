import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { TagAdmin } from 'libs/models/tagAdmin.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TagsAdminService {
  private response: Response;

  constructor(
    @InjectModel(TagAdmin)
    private readonly TagAdminModel: ReturnModelType<typeof TagAdmin>,
  ) {}

  async addTagAdmin(tag: TagAdmin) {
    const tName: string = tag.tName;
    return await this.findTagAdminByTName(tName)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '管理员标签名称已存在',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createTag = new this.TagAdminModel(tag);
          await createTag.save();
          this.response = {
            code: 0,
            msg: '管理员标签创建成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '管理员标签创建失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteTagAdmin(id: string) {
    return await this.TagAdminModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '管理员标签删除成功',
      };
      return this.response;
    });
  }

  async deleteTagAdminAll(id: string) {
    const ids = id.split(',');
    return await this.TagAdminModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '管理员标签批量删除成功',
      };
      return this.response;
    });
  }

  async updateTagAdmin(id: string, tag: TagAdmin) {
    return await this.TagAdminModel.findByIdAndUpdate(id, {
      tName: tag.tName,
      color: tag.color,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '管理员标签修改成功',
      };
      return this.response;
    });
  }

  async findTagAdminById(id: string) {
    return await this.TagAdminModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取管理员标签信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findTagAdminByTName(tName: string) {
    return await this.TagAdminModel.findOne({ tName });
  }

  async findTagAdminCount() {
    const count = await this.TagAdminModel.countDocuments();

    return {
      data: count,
    };
  }

  async findTagAdminAll() {
    return await this.TagAdminModel.find().then((res) => {
      this.response = {
        code: 0,
        msg: '获取管理员标签列表成功',
        data: res,
      };
      return this.response;
    });
  }

  async findTagAdminAllByTName(tName: string) {
    return await this.TagAdminModel.find({ tName: { $regex: tName } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取管理员标签名称成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '管理员标签名称不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findTagAdminAllByColor(color: string) {
    return await this.TagAdminModel.find({ color: { $regex: color } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取管理员标签颜色成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '管理员标签颜色不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
