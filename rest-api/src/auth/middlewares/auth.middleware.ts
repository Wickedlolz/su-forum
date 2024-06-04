import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cookieName = process.env.COOKIE_NAME;

    if (!cookieName) {
      console.error('Environment variable COOKIE_NAME is not set');
      throw new HttpException('Internal Server Error', 500);
    }

    const token = req.cookies[cookieName];

    if (!token) {
      req['user'] = null;
      next();
      return;
    }

    try {
      const payload = await this.authService.validateToken(token);

      req['user'] = {
        email: payload.email,
        _id: payload._id,
        username: payload.username,
        token,
      };

      next();
    } catch (error) {
      console.error('Error validating token:', error.message);
      res.clearCookie(process.env.COOKIE_NAME);
      throw new HttpException('Invalid token!', 401);
    }
  }
}
