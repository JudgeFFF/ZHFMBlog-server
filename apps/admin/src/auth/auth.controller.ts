import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'libs/models/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  async loginUser(@Body() userDto: User) {
    return this.authService.login(userDto);
  }
}
