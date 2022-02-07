import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'libs/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async registerUser(@Body() userDto: User) {
    return await this.authService.register(userDto);
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async loginUser(@Body() userDto: User) {
    return this.authService.login(userDto);
  }

  @Post('/changePassword')
  @ApiOperation({ summary: '修改密码' })
  async changePassword(@Body() userDto) {
    return this.authService.changePassword(userDto);
  }
}
