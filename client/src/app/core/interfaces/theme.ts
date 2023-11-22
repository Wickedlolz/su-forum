import { IUser } from './user';

export interface ITheme<T = string> {
  subscribers: string[];
  posts: T[];
  _id: string;
  themeName: string;
  userId: IUser;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface IThemeDto {
  postText: string;
  themeName: string;
}
