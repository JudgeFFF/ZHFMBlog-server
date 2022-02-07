import { Module } from '@nestjs/common';
import { StatisticsService } from '../statistics/statistics.service';
import { ArticlesAdminController } from './articles-admin.controller';
import { ArticlesAdminService } from './articles-admin.service';

@Module({
  controllers: [ArticlesAdminController],
  providers: [ArticlesAdminService, StatisticsService],
})
export class ArticlesAdminModule {}
