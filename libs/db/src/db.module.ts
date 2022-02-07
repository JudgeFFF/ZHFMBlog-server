import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Action } from 'libs/models/action.model';
import { ArticleAdmin } from 'libs/models/articleAdmin.model';
import { ArticleUser } from 'libs/models/articleUser.model';
import { TagAdmin } from 'libs/models/tagAdmin.model';
import { TagUser } from 'libs/models/tagUser.model';
import { Comment } from 'libs/models/comment.model';
import { Message } from 'libs/models/message.model';
import { Region } from 'libs/models/region.model';
import { Statistic } from 'libs/models/statistic.model';
import { User } from 'libs/models/user.model';
import { JWT_CONSTANT } from 'libs/utils/jwt.constant';
import { JwtStrategy } from 'libs/utils/jwt.strategy';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';

const models = TypegooseModule.forFeature([
  User,
  ArticleUser,
  ArticleAdmin,
  TagUser,
  TagAdmin,
  Region,
  Comment,
  Message,
  Action,
  Statistic,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/ZhFoodBlog', {
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    models,
    PassportModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: JWT_CONSTANT.secret,
          // signOptions: { expiresIn: '60s' },
        };
      },
    }),
  ],
  providers: [DbService, JwtStrategy],
  exports: [DbService, models, JwtModule],
})
export class DbModule {}
