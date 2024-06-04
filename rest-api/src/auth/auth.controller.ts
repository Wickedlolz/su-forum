import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const { user, token } = await this.authService.register(registerDto);

    res.cookie(process.env.COOKIE_NAME, token);
    res.status(200).json(user);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { user, token } = await this.authService.login(loginDto);

    res.cookie(process.env.COOKIE_NAME, token);
    res.status(200).json(user);
  }
}
