import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('数据模块')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('getStatisticViewListByArticleAdmin')
  @ApiOperation({ summary: '获取管理员文章浏览数据列表' })
  async getStatisticViewListByArticleAdmin() {
    return await this.statisticsService.findStatisticViewAllByArticleAdmin();
  }

  @Get('getStatisticViewListByArticleUser')
  @ApiOperation({ summary: '获取用户文章浏览数据列表' })
  async getStatisticViewListByArticleUser() {
    return await this.statisticsService.findStatisticViewAllByArticleUser();
  }

  @Get('getStatisticAccessList')
  @ApiOperation({ summary: '获取访问数据列表' })
  async getStatisticAccessList() {
    return await this.statisticsService.findStatisticAccessAll();
  }

  @Get('getStatisticArticleAdminListByView')
  @ApiOperation({ summary: '获取管理员文章访问列表' })
  async getStatisticArticleAdminListByView() {
    return await this.statisticsService.findStatisticArticleAdminAllByView();
  }

  @Get('getStatisticArticleUserListByView')
  @ApiOperation({ summary: '获取用户文章访问列表' })
  async getStatisticArticleUserListByView() {
    return await this.statisticsService.findStatisticArticleUserAllByView();
  }
}
