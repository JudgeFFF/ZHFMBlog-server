import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ArticleAdmin } from './articleAdmin.model';
import { ArticleUser } from './articleUser.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Statistic {
  readonly _id: ObjectId;

  @prop({ enum: ['ArticleUser', 'ArticleAdmin'] })
  type: string;

  @prop({ refPath: 'type' })
  objectId: Ref<ArticleUser | ArticleAdmin>;

  @ApiProperty({ description: '评分数据', example: 0 })
  @prop()
  sRate: number;

  @ApiProperty({ description: '收藏数据', example: 0 })
  @prop()
  sCollect: number;

  @ApiProperty({ description: '浏览数据', example: 0 })
  @prop()
  sView: number;

  @ApiProperty({ description: '评论数据', example: 0 })
  @prop()
  sComment: number;

  @ApiProperty({ description: '访问数据', example: 0 })
  @prop()
  sAccess: number;
}
