import { Schema, Document, Types } from 'mongoose';
import { IUser } from './user.schema';
import { IPost } from './post.schema';

export const ThemeSchema = new Schema(
  {
    themeName: {
      type: String,
      required: true,
    },
    subscribers: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
);

export interface ITheme extends Document {
  _id: string;
  themeName: string;
  subscribers: (IUser | string)[];
  userId: IUser;
  posts: IPost[];
  createdAt: string;
  updatedAt: string;
}
