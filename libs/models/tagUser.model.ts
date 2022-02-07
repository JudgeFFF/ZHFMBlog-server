import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class TagUser {
  readonly _id: ObjectId;

  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '用户标签名称', example: 'tName' })
  @prop()
  tName: string;

  @ApiProperty({ description: '标签颜色', example: 'color' })
  @prop()
  color: string;
}
