import { IPost } from './post';
import { ITheme } from './theme';

export interface IUser {
  themes: string[];
  posts: string[];
  _id: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  created_at: string;
  updatedAt: string;
  __v: number;
}

export interface IUserLoginDto {}

export interface IUserRegisterDto {}
