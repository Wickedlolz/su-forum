import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/schemas/user.schema';
import { hash, compare } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.getUserByEmail(registerDto.email);

    if (existing) {
      throw new HttpException('Email is taken.', 400);
    }

    const hashedPassword = await hash(registerDto.password, 10);

    const newUser = new this.userModel({
      ...registerDto,
      password: hashedPassword,
    });

    if (registerDto.phone) {
      newUser.phone = registerDto.phone;
    }

    await newUser.save();

    const result = this.bsonToJson(newUser);
    const token = await this.createToken(result);

    return { user: this.removePassword(result), token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Incorect email or password!');
    }

    const isIdentical = await compare(loginDto.password, user.password);

    if (!isIdentical) {
      throw new UnauthorizedException('Incorect email or password!');
    }

    const result = this.bsonToJson(user);
    const token = await this.createToken(result);

    return { user: this.removePassword(result), token };
  }

  private async createToken(user: IUser) {
    const payload = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return token;
  }

  async validateToken(
    token: string,
  ): Promise<{ username: string; email: string; _id: string }> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    return payload;
  }

  private async getUserByEmail(email: string) {
    const user = await this.userModel
      .findOne({
        email: new RegExp(`^${email}$`, 'i'),
      })
      .lean();

    return user;
  }

  private removePassword(user: IUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, __v, ...userData } = user;

    return userData;
  }

  private bsonToJson(user: IUser): IUser {
    return JSON.parse(JSON.stringify(user));
  }
}
