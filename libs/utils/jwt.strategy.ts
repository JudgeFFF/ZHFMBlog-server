import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONSTANT } from './jwt.constant';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private response: Response;

  constructor(
    @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(id) {
    return await this.UserModel.findById(id)
      .then((res) => {
        if (!res) {
          this.response = {
            code: 5,
            msg: '用户尚未注册',
          };
          throw this.response;
        }
        return res;
      })
      .then((dbUser: User) => {
        this.response = {
          code: 0,
          msg: '查询用户信息成功',
          data: dbUser,
        };
        return this.response;
      })
      .catch((err) => err);
  }
}
