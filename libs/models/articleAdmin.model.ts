import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Region } from './region.model';
import { TagAdmin } from './tagAdmin.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ArticleAdmin {
  readonly _id: ObjectId;

  @ApiProperty({ description: '管理员文章标题', example: 'title' })
  @prop()
  title: string;

  @prop({ ref: 'Region' })
  region: Ref<Region>;

  @prop({ ref: 'TagAdmin' })
  tag: Ref<TagAdmin>[];

  @ApiProperty({ description: '管理员文章封面', example: 'cover' })
  @prop()
  cover: string;

  @ApiProperty({ description: '管理员文章介绍', example: 'introduce' })
  @prop()
  introduce: string;

  @ApiProperty({ description: '管理员文章内容', example: 'content' })
  @prop()
  content: string;

  @prop({ ref: 'Statistic' })
  statistic: ObjectId;
}
