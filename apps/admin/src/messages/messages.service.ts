import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'libs/interfaces/response.interface';
import { Message } from 'libs/models/message.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class MessagesService {
  private response: Response;

  constructor(
    @InjectModel(Message)
    private readonly MessageModel: ReturnModelType<typeof Message>,
  ) {}

  async deleteMessage(id: string) {
    return await this.MessageModel.findByIdAndDelete(id).then(() => {
      this.response = {
        code: 0,
        msg: '留言删除成功',
      };
      return this.response;
    });
  }

  async deleteMessageAll(id: string) {
    const ids = id.split(',');
    return await this.MessageModel.remove({ _id: { $in: ids } }).then(() => {
      this.response = {
        code: 0,
        msg: '留言批量删除成功',
      };
      return this.response;
    });
  }

  async findMessageById(id: string) {
    return await this.MessageModel.findById(id).then((res) => {
      this.response = {
        code: 0,
        msg: '获取留言信息成功',
        data: res,
      };
      return this.response;
    });
  }

  async findMessageCount() {
    const count = await this.MessageModel.countDocuments();

    return {
      data: count,
    };
  }

  async findMessageAll() {
    return await this.MessageModel.find()
      .populate('user')
      .then((res) => {
        this.response = {
          code: 0,
          msg: '获取留言列表成功',
          data: res,
        };
        return this.response;
      });
  }

  async findMessageAllByUsername(username: string) {
    return await this.MessageModel.find()
      .populate({ path: 'user', match: { username: { $regex: username } } })
      .then((res) => {
        if (res.length !== 0) {
          this.response = {
            code: 0,
            msg: '获取留言用户列表成功',
            data: res,
          };
          return this.response;
        }
        this.response = {
          code: 5,
          msg: '留言用户列表不存在',
        };
        throw this.response;
      })
      .catch((err) => {
        return err;
      });
  }
}
