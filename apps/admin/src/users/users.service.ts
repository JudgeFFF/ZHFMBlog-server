import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { User } from 'libs/models/user.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class UsersService {
  private response: Response;

  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {}

  async deleteUser(id: string) {
    return await this.UserModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '用户删除成功',
      };
      return this.response;
    });
  }

  async deleteUserAll(id: string) {
    const ids = id.split(',');
    return await this.UserModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '用户批量删除成功',
      };
      return this.response;
    });
  }

  async updateUser(id: string, user: User) {
    return await this.UserModel.findByIdAndUpdate(id, {
      isAdmin: user.isAdmin,
    }).then(() => {
      this.response = {
        code: 0,
        msg: '用户修改成功',
      };
      return this.response;
    });
  }

  async findUserById(id: string) {
    return await this.UserModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取用户信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findUserByUserName(username: string) {
    return await this.UserModel.findOne({ username }).select('+password');
  }

  async findUserCount() {
    const count = await this.UserModel.countDocuments();

    return {
      data: count,
    };
  }

  async findUserAll() {
    return await this.UserModel.find().then((res) => {
      this.response = {
        code: 0,
        msg: '用户列表查询成功',
        data: res,
      };
      return this.response;
    });
  }

  async findUserAllByUserName(username: string) {
    return await this.UserModel.find({ username: { $regex: username } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '用户名查询成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户名不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async findUserAllByIsAdmin(isAdmin: number) {
    return await this.UserModel.find({ isAdmin })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '用户权限查询成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '用户权限不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
