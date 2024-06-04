import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IAuthRequest } from 'src/interfaces/user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getLatestsPosts(@Query('limit') limit: string) {
    const limitQuery = Number(limit) || 0;

    return this.postsService.getLatestPosts(limitQuery);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('like/:postId')
  @UseGuards(AuthGuard)
  async likeUnlikePost(
    @Param('postId') postId: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;

    return this.postsService.likeUnlikePost(postId, userId);
  }
}
