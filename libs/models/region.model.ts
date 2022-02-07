import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Region {
  readonly _id: ObjectId;

  @ApiProperty({ description: '地区名称', example: 'rName' })
  @prop()
  rName: string;
}
