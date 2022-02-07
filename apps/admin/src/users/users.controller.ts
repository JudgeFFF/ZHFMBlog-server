import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'libs/models/user.model';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户模块')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Delete('deleteUser/:id')
  @ApiOperation({ summary: '用户删除' })
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Delete('deleteUserAll/:ids')
  @ApiOperation({ summary: '批量用户删除' })
  async deleteUserAll(@Param('ids') id: string) {
    return await this.userService.deleteUserAll(id);
  }

  @Put('updateUser/:id')
  @ApiOperation({ summary: '用户编辑' })
  async updateUser(@Param('id') id: string, @Body() userDto: User) {
    return await this.userService.updateUser(id, userDto);
  }

  @Get('getUserByToken')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getUserByToken(@Request() req) {
    return req.user;
  }

  @Get('getUserById/:id')
  @ApiOperation({ summary: '获取用户信息' })
  async getUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Get('getUserCount')
  @ApiOperation({ summary: '获取用户量' })
  async getUserCount() {
    return await this.userService.findUserCount();
  }

  @Get('getUserList')
  @ApiOperation({ summary: '获取用户列表' })
  async getUserList() {
    return await this.userService.findUserAll();
  }

  @Get('getUserListByUsername/:username')
  @ApiOperation({ summary: '获取用户名' })
  async getUserListByUserName(@Param('username') username: string) {
    return await this.userService.findUserAllByUserName(username);
  }

  @Get('getUserListByIsAdmin/:isAdmin')
  @ApiOperation({ summary: '获取用户权限' })
  async getUserListByIsAdmin(@Param('isAdmin') isAdmin: number) {
    return await this.userService.findUserAllByIsAdmin(isAdmin);
  }
}
