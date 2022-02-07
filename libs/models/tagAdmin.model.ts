import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class TagAdmin {
  readonly _id: ObjectId;

  @ApiProperty({ description: '管理员标签名称', example: 'tName' })
  @prop()
  tName: string;

  @ApiProperty({ description: '标签颜色', example: 'color' })
  @prop()
  color: string;
}
