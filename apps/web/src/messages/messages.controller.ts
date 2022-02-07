import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Message } from 'libs/models/message.model';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('留言模块')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('addMessage')
  @ApiOperation({ summary: '留言添加' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async addMessage(@Body() messageDto: Message, @Req() req) {
    messageDto.user = req.user.data;
    return await this.messagesService.addMessage(messageDto);
  }

  @Get('getMessageList')
  @ApiOperation({ summary: '获取留言列表' })
  async getMessageList() {
    return await this.messagesService.findMessageAll();
  }
}
