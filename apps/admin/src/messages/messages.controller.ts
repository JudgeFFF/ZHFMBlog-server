import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('留言模块')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Delete('deleteMessage/:id')
  @ApiOperation({ summary: '留言删除' })
  async deleteMessage(@Param('id') id: string) {
    return await this.messagesService.deleteMessage(id);
  }

  @Delete('deleteMessageAll/:ids')
  @ApiOperation({ summary: '留言批量删除' })
  async deleteMessageAll(@Param('ids') id: string) {
    return await this.messagesService.deleteMessageAll(id);
  }

  @Get('getMessageById/:id')
  @ApiOperation({ summary: '获取留言信息' })
  async getMessageById(@Param('id') id: string) {
    return await this.messagesService.findMessageById(id);
  }

  @Get('getMessageCount')
  @ApiOperation({ summary: '获取留言数量' })
  async getMessageCount() {
    return await this.messagesService.findMessageCount();
  }

  @Get('getMessageList')
  @ApiOperation({ summary: '获取留言列表' })
  async getMessageList() {
    return await this.messagesService.findMessageAll();
  }

  @Get('getMessageListByUsername/:username')
  @ApiOperation({ summary: '获取留言用户名列表' })
  async getMessageListByUsername(@Param('username') username: string) {
    return await this.messagesService.findMessageAllByUsername(username);
  }
}
