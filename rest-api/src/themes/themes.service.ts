import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { ITheme } from 'src/schemas/theme.schema';
import { IUser } from 'src/schemas/user.schema';

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel('Theme') private readonly themeModel: Model<ITheme>,
    private readonly postService: PostsService,
  ) {}

  async getThemes(searchTerm: string, limit: number, offset: number) {
    const themes = await this.themeModel
      .find({
        themeName: { $regex: searchTerm, $options: 'i' },
      })
      .sort({ createdAt: -1 })
      .populate({ path: 'userId', select: '-password' })
      .skip(offset)
      .limit(limit)
      .lean();

    const themesCount = await this.themeModel
      .find({
        themeName: { $regex: searchTerm, $options: 'i' },
      })
      .countDocuments();

    return { themes, count: themesCount };
  }

  async getThemeById(themeId: string) {
    const theme = (await this.themeModel.findById(themeId)).populate({
      path: 'posts',
      populate: {
        path: 'userId',
        select: '-password',
      },
    });

    return theme;
  }

  async createTheme(themeName: string, userId: string, postText: string) {
    const theme = new this.themeModel({
      themeName,
      userId,
      subscribers: [userId],
    });

    await theme.save();

    const updatedTheme = await this.postService.createPost(
      postText,
      userId,
      theme._id,
    );

    return updatedTheme;
  }

  async subscribe(themeId: string, userId: string) {
    const theme = await this.themeModel.findById(themeId);
    const isSubscribed = theme.subscribers.includes(userId);

    if (isSubscribed) {
      (theme.subscribers as Types.Array<string | IUser>).pull(userId);
    } else {
      theme.subscribers.push(userId);
    }

    await theme.save();

    return theme.populate([
      'posts',
      { path: 'posts', populate: { path: 'userId', select: '-password' } },
      { path: 'userId', select: '-password' },
    ]);
  }
}
