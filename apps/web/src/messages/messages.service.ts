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

  async addMessage(message: Message) {
    const CreateMessage = new this.MessageModel(message);
    return await CreateMessage.save().then((res) => {
      this.response = {
        code: 0,
        msg: '留言创建成功',
        data: res,
      };
      return this.response;
    });
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
}
