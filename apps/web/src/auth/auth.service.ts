import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { Response } from 'libs/interfaces/response.interface';
import { User } from 'libs/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private response: Response;

  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(user: User) {
    const username: string = user.username;
    const password: string = user.password;
    return await this.userService
      .findUserByUserName(username)
      .then((res) => {
        if (!res) {
          this.response = {
            code: 3,
            msg: '用户尚未注册',
          };
          throw this.response;
        }
        return res;
      })
      .then((dbUser: User) => {
        if (compareSync(password, dbUser.password)) {
          this.response = {
            code: 0,
            msg: '用户登录成功',
            data: dbUser._id,
          };
          return this.response;
        } else {
          this.response = {
            code: 4,
            msg: '用户名或密码错误',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  private async createToken(id: string) {
    return await this.jwtService.sign(id);
  }

  async register(user: User) {
    const username: string = user.username;
    return await this.userService
      .findUserByUserName(username)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '用户已注册',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.UserModel(user);
          await createUser.save();
          this.response = {
            code: 0,
            msg: '用户注册成功',
            data: createUser,
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户注册失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async login(user: User) {
    return await this.validate(user)
      .then(async (res: Response) => {
        if (res.code === 0) {
          const userId = res.data;
          const token = await this.createToken(String(userId));
          this.response = {
            code: 0,
            msg: '用户验证成功',
            data: {
              token: token,
            },
          };
          return this.response;
        }
        this.response = res;
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }

  async changePassword(user) {
    return await this.validate(user)
      .then(async (res: Response) => {
        if (res.code === 0) {
          await this.UserModel.findByIdAndUpdate(res.data, {
            password: user.newPassword,
          });
          this.response = {
            code: 0,
            msg: '用户密码修改成功',
          };
          return this.response;
        }
        this.response = res;
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
