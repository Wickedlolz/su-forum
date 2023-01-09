import { IPost } from './post';
import { IUser } from './user';

export interface ITheme {
  themeName: string;
  subscribers: IUser[];
  userId: IUser;
  posts: IPost[];
}
