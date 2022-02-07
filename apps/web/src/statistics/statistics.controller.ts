import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Statistic } from 'libs/models/statistic.model';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('数据模块')
export class StatisticsController {
  constructor(private readonly StatisticsService: StatisticsService) {}

  @Post('setRateStatistic')
  @ApiOperation({ summary: '评分数据状态' })
  async setRateStatistic(@Body() statisticDto: Statistic) {
    return await this.StatisticsService.setRateStatistic(statisticDto);
  }

  @Post('setCollectStatistic')
  @ApiOperation({ summary: '收藏数据状态' })
  async setCollectStatistic(@Body() statisticDto: Statistic) {
    return await this.StatisticsService.setCollectStatistic(statisticDto);
  }

  @Post('setViewStatistic')
  @ApiOperation({ summary: '访问数据状态' })
  async setViewStatistic(@Body() statisticDto: Statistic) {
    return await this.StatisticsService.setViewStatistic(statisticDto);
  }

  @Post('setCommentStatistic')
  @ApiOperation({ summary: '评论数据状态' })
  async setCommentStatistic(@Body() statisticDto: Statistic) {
    return await this.StatisticsService.setCommentStatistic(statisticDto);
  }

  @Get('setAccessStatistic')
  @ApiOperation({ summary: '访问数据状态' })
  async setAccessStatistic() {
    return await this.StatisticsService.setAccessStatistic();
  }

  @Get('getStatisticListByRate/:type')
  @ApiOperation({ summary: '获取文章评分列表' })
  async getStatisticListByRate(@Param('type') type: string) {
    return await this.StatisticsService.findStatisticAllByRate(type);
  }

  @Get('getStatisticListByView/:type')
  @ApiOperation({ summary: '获取文章访问列表' })
  async getStatisticListByView(@Param('type') type: string) {
    return await this.StatisticsService.findStatisticAllByView(type);
  }
}
