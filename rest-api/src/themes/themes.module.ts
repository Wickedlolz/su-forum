import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ThemeSchema } from 'src/schemas/theme.schema';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Theme', schema: ThemeSchema }]),
    PostsModule,
  ],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
