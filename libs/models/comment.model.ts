import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ArticleAdmin } from './articleAdmin.model';
import { ArticleUser } from './articleUser.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Comment {
  readonly _id: ObjectId;

  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop({ enum: ['ArticleUser', 'ArticleAdmin'] })
  type: string;

  @prop({ refPath: 'type' })
  objectId: Ref<ArticleUser | ArticleAdmin>;

  @ApiProperty({ description: '评论内容', example: 'cContent' })
  @prop()
  cContent: string;

  @ApiProperty({ description: '评论评分', example: 0 })
  @prop()
  rate: number;
}
