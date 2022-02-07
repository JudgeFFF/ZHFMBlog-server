import { Module } from '@nestjs/common';
import { ArticlesUserController } from './articles-user.controller';
import { ArticlesUserService } from './articles-user.service';

@Module({
  controllers: [ArticlesUserController],
  providers: [ArticlesUserService]
})
export class ArticlesUserModule {}
