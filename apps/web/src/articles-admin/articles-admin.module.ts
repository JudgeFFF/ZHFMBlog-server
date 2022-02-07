import { Module } from '@nestjs/common';
import { ArticlesAdminController } from './articles-admin.controller';
import { ArticlesAdminService } from './articles-admin.service';

@Module({
  controllers: [ArticlesAdminController],
  providers: [ArticlesAdminService]
})
export class ArticlesAdminModule {}
