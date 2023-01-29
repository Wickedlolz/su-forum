import { IPost } from './post';
import { IUser } from './user';

export interface ITheme {
  subscribers: string[];
  posts: IPost[];
  _id: string;
  themeName: string;
  userId: IUser;
  created_at: string;
  updatedAt: string;
  __v: 0;
}

export interface IThemeDto {
  postText: string;
  themeName: string;
}
