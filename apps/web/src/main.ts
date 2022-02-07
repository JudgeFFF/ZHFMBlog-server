import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebModule } from './web.module';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('珠海市美食博客管理系统')
    .setDescription('前端-接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(5000);
  console.log('http://localhost:5000/api-docs');
}
bootstrap();
