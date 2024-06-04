import {
  Body,
  Controller,
  Get,
  HttpException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { IAuthRequest } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserById(@Req() req: IAuthRequest) {
    const { _id: userId } = req.user;
    const isValidId = Types.ObjectId.isValid(userId);

    if (!isValidId) {
      throw new HttpException('User not found!', 404);
    }

    const user = await this.usersService.getProfileInfo(userId);
    return user;
  }

  @Put('profile')
  @UseGuards(AuthGuard)
  async updateUserInfo(
    @Body('phone') phone: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('photoURL') photoURL: string,
    @Req() req: IAuthRequest,
  ) {
    const { _id: userId } = req.user;
    return this.usersService.updateProfileInfo(
      userId,
      phone,
      username,
      email,
      photoURL,
    );
  }
}
