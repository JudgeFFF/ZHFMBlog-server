import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Region } from './region.model';
import { TagUser } from './tagUser.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class ArticleUser {
  readonly _id: ObjectId;

  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '用户文章标题', example: 'title' })
  @prop()
  title: string;

  @prop({ ref: 'TagUser' })
  tag: Ref<TagUser>[];

  @ApiProperty({ description: '用户文章封面', example: 'cover' })
  @prop()
  cover: string;

  @ApiProperty({ description: '用户文章介绍', example: 'introduce' })
  @prop()
  introduce: string;

  @ApiProperty({ description: '用户文章内容', example: 'content' })
  @prop()
  content: string;

  @prop({ ref: 'Statistic' })
  statistic: ObjectId;
}
