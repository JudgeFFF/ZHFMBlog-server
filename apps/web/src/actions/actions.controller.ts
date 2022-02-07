import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Action } from 'libs/models/action.model';
import { InjectModel } from 'nestjs-typegoose';
import { ActionsService } from './actions.service';

@Controller('actions')
@ApiTags('文章操作模块')
export class ActionsController {
  constructor(
    @InjectModel(Action)
    private readonly ActionModel: ReturnModelType<typeof Action>,
    private readonly actionsService: ActionsService,
  ) {}

  @Get('getCollectStatus/:type&:objectId')
  @ApiOperation({ summary: '获取收藏操作状态' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getCollectStatus(
    @Param('type') type: string,
    @Param('objectId') objectId: string,
    @Req() req,
  ) {
    const actionDto: any = { type, objectId };
    actionDto.user = req.user.data;
    return await this.actionsService.getCollectStatus(actionDto);
  }

  @Get('getCollectArticleAdminListByUsername/:username')
  @ApiOperation({ summary: '获取收藏管理员文章列表' })
  async getCollectArticleAdminListByUsername(
    @Param('username') username: string,
  ) {
    return await this.actionsService.findCollectArticleAdminAllByUsername(
      username,
    );
  }

  @Get('getCollectArticleUserListByUsername/:username')
  @ApiOperation({ summary: '获取收藏用户文章列表' })
  async getCollectArticleUserListByUsername(
    @Param('username') username: string,
  ) {
    return await this.actionsService.findCollectArticleUserAllByUsername(
      username,
    );
  }

  @Post('setCollectStatus')
  @ApiOperation({ summary: '收藏操作状态' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async setCollectStatus(@Body() actionDto: Action, @Req() req) {
    actionDto.user = req.user.data;
    const res = await this.actionsService.getCollectStatus(actionDto);
    if (res.status) {
      await this.ActionModel.deleteMany(actionDto);
    } else {
      const CreateStatus = new this.ActionModel(actionDto);
      await CreateStatus.save();
    }
    return await this.actionsService.getCollectStatus(actionDto);
  }
}
