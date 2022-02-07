import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Message {
  readonly _id: ObjectId;

  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '留言内容', example: 'mContent' })
  @prop()
  mContent: string;
}
