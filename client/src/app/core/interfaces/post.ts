import { ITheme } from './theme';
import { IUser } from './user';

export interface IPost {
  text: string;
  likes: IUser[];
  userId: IUser;
  themeId: ITheme;
}
