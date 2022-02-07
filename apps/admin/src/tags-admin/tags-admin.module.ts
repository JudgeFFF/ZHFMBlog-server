import { Module } from '@nestjs/common';
import { TagsAdminController } from './tags-admin.controller';
import { TagsAdminService } from './tags-admin.service';

@Module({
  controllers: [TagsAdminController],
  providers: [TagsAdminService]
})
export class TagsAdminModule {}
