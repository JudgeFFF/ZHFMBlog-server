import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { TagUser } from 'libs/models/tagUser.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TagsUserService {
  private response: Response;

  constructor(
    @InjectModel(TagUser)
    private readonly TagUserModel: ReturnModelType<typeof TagUser>,
  ) {}

  async addTagUser(tag: TagUser) {
    const tName: string = tag.tName;
    return await this.findTagUserByTName(tName)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '用户标签已存在',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createTag = new this.TagUserModel(tag);
          await createTag.save();
          this.response = {
            code: 0,
            msg: '用户标签创建成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户标签创建失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async deleteTagUser(id: string) {
    return await this.TagUserModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '用户标签删除成功',
      };
      return this.response;
    });
  }

  async deleteTagUserAll(id: string) {
    const ids = id.split(',');
    return await this.TagUserModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '用户标签批量删除成功',
      };
      return this.response;
    });
  }

  async updateTagUser(id: string, tag: TagUser) {
    return await this.TagUserModel.findByIdAndUpdate(id, {
      tName: tag.tName,
      color: tag.color,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '用户标签修改成功',
      };
      return this.response;
    });
  }

  async findTagUserById(id: string) {
    return await this.TagUserModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取用户标签信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findTagUserByTName(tName: string) {
    return await this.TagUserModel.findOne({ tName });
  }

  async findTagUserCount() {
    const count = await this.TagUserModel.countDocuments();

    return {
      data: count,
    };
  }

  async findTagUserAll() {
    return await this.TagUserModel.find()
      .populate({ path: 'user' })
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取用户标签列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findTagUserAllByUsername(username: string) {
    return await this.TagUserModel.find()
      .populate({ path: 'user', match: { username } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户名标签列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名标签不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findTagUserTNameAllByUsername(username: string, tName: string) {
    return await this.TagUserModel.find({ tName })
      .populate({ path: 'user', match: { username } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户名标签名称列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名标签名称不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findTagUserColorAllByUsername(username: string, color: string) {
    return await this.TagUserModel.find({ color })
      .populate({ path: 'user', match: { username } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户名标签颜色列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名标签颜色不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findTagUserAllByTName(tName: string) {
    return await this.TagUserModel.find({ tName: { $regex: tName } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户标签名称成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户标签名称不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findTagUserAllByColor(color: string) {
    return await this.TagUserModel.find({ color: { $regex: color } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取用户标签颜色成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户标签颜色不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
