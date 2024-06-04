import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { Types } from 'mongoose';
import { IAuthRequest } from 'src/interfaces/user.interface';
import { PostsService } from 'src/posts/posts.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('themes')
export class ThemesController {
  constructor(
    private readonly themeService: ThemesService,
    private readonly postService: PostsService,
  ) {}

  @Get()
  getThemes(
    @Query('title') title: string,
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const searchTearm = title || '';
    const limitQuery = Number(limit) || Number.MAX_SAFE_INTEGER;
    const offsetQuery = Number(offset) || 0;

    return this.themeService.getThemes(searchTearm, limitQuery, offsetQuery);
  }

  @Get('/:themeId')
  async getThemeById(@Param('themeId') themeId: string) {
    const isValidId = Types.ObjectId.isValid(themeId);

    if (!isValidId) {
      throw new HttpException('Theme not found!', 404);
    }

    try {
      const theme = await this.themeService.getThemeById(themeId);

      if (!theme) {
        throw new HttpException('Theme not found!', 404);
      }

      return theme;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  createTheme(
    @Body('themeName') themeName: string,
    @Body('postText') postText: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;

    return this.themeService.createTheme(themeName, userId, postText);
  }

  @Post(':themeId')
  @UseGuards(AuthGuard)
  createPostForTheme(
    @Param('themeId') themeId: string,
    @Body('postText') postText: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;

    return this.postService.createPost(postText, userId, themeId);
  }

  @Put(':themeId')
  subscribeForTheme(
    @Param('themeId') themeId: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;

    return this.themeService.subscribe(themeId, userId);
  }

  @Put(':themeId/posts/:postId')
  @UseGuards(AuthGuard)
  editThemePost(
    @Param('postId') postId: string,
    @Body('postText') postText: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;
    return this.postService.editPost(postText, userId, postId);
  }

  @Delete(':themeId/posts/:postId')
  @UseGuards(AuthGuard)
  deletePostById(
    @Param('themeId') themeId: string,
    @Param('postId') postId: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;

    return this.postService.deletePost(postId, themeId, userId);
  }
}
