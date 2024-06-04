import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/schemas/post.schema';
import { ThemeSchema } from 'src/schemas/theme.schema';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Theme', schema: ThemeSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
