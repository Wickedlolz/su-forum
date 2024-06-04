import { Schema, Document, Types } from 'mongoose';
import { IUser } from './user.schema';
import { ITheme } from './theme.schema';

export const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    themeId: {
      type: Types.ObjectId,
      ref: 'Theme',
    },
  },
  { timestamps: true },
);

export interface IPost extends Document {
  _id: string;
  text: string;
  likes: (IUser | string)[];
  userId: IUser;
  themeId: ITheme;
  createdAt: string;
  updatedAt: string;
}
