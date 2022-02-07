import { Module } from '@nestjs/common';
import { ActionsService } from '../actions/actions.service';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, ActionsService],
})
export class StatisticsModule {}
