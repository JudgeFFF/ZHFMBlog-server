import { Module } from '@nestjs/common';
import { StatisticsService } from '../statistics/statistics.service';
import { ArticlesUserController } from './articles-user.controller';
import { ArticlesUserService } from './articles-user.service';

@Module({
  controllers: [ArticlesUserController],
  providers: [ArticlesUserService, StatisticsService],
})
export class ArticlesUserModule {}
