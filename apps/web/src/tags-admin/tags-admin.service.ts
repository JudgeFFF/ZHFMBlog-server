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
}
