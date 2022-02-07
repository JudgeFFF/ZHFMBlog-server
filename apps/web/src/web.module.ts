import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { AuthModule } from './auth/auth.module';
import { ArticlesAdminModule } from './articles-admin/articles-admin.module';
import { ArticlesUserModule } from './articles-user/articles-user.module';
import { TagsAdminModule } from './tags-admin/tags-admin.module';
import { TagsUserModule } from './tags-user/tags-user.module';
import { CommentsModule } from './comments/comments.module';
import { MessagesModule } from './messages/messages.module';
import { ActionsModule } from './actions/actions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UsersModule } from './users/users.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [
    DbModule,
    AuthModule,
    ArticlesAdminModule,
    ArticlesUserModule,
    TagsAdminModule,
    TagsUserModule,
    CommentsModule,
    MessagesModule,
    ActionsModule,
    StatisticsModule,
    UsersModule,
    RegionsModule,
  ],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
