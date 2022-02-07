import { Module } from '@nestjs/common';
import { TagsUserController } from './tags-user.controller';
import { TagsUserService } from './tags-user.service';

@Module({
  controllers: [TagsUserController],
  providers: [TagsUserService]
})
export class TagsUserModule {}
