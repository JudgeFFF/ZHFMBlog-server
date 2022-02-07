import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiTags('测试模块')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  @ApiOperation({ summary: '测试接口' })
  getHello(): string {
    return this.adminService.getHello();
  }
}
