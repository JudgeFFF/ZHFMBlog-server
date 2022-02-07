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

  async findUserByUserName(username: string) {
    return await this.UserModel.findOne({ username }).select('+password');
  }
}
