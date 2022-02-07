import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArticlesUserModule } from './articles-user/articles-user.module';
import { ArticlesAdminModule } from './articles-admin/articles-admin.module';
import { RegionsModule } from './regions/regions.module';
import { CommentsModule } from './comments/comments.module';
import { MessagesModule } from './messages/messages.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TagsUserModule } from './tags-user/tags-user.module';
import { TagsAdminModule } from './tags-admin/tags-admin.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    AuthModule,
    ArticlesUserModule,
    ArticlesAdminModule,
    TagsUserModule,
    TagsAdminModule,
    RegionsModule,
    CommentsModule,
    MessagesModule,
    StatisticsModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
