import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('用户模块')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('getUserByToken')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getUserByToken(@Request() req) {
    return req.user;
  }
}
