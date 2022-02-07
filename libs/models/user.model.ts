import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { hashSync } from 'bcryptjs';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  readonly _id: ObjectId;

  @ApiProperty({ description: '用户名', example: 'admin' })
  @prop()
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @prop({
    select: false,
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ description: '用户权限（0:管理员，1:用户）', example: 1 })
  @prop()
  isAdmin: number;
}
