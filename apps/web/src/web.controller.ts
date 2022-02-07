import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebService } from './web.service';

@Controller('web')
@ApiTags('测试模块')
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Get('/')
  @ApiOperation({ summary: '测试接口' })
  getHello(): string {
    return this.webService.getHello();
  }
}
