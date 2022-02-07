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

  async findTagUserAll() {
    return await this.TagUserModel.find().then((res) => {
      this.response = {
        code: 0,
        msg: '获取用户标签列表成功',
        data: res,
      };
      return this.response;
    });
  }
}
