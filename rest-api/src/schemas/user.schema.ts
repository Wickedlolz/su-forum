import { Schema, Document, Types } from 'mongoose';
import { ITheme } from './theme.schema';
import { IPost } from './post.schema';

export const UserSchema = new Schema(
  {
    phone: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, 'Username should be at least 5 characters'],
      validate: {
        validator: function (v) {
          return /[a-zA-Z0-9]+/g.test(v);
        },
        message: (props) =>
          `${props.value} must contains only latin letters and digits!`,
      },
    },
    email: { type: String, required: true, unique: true },
    photoURL: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: [5, 'Password should be at least 5 characters'],
      validate: {
        validator: function (v) {
          return /[a-zA-Z0-9]+/g.test(v);
        },
        message: (props) =>
          `${props.value} must contains only latin letters and digits!`,
      },
    },
    themes: [
      {
        type: Types.ObjectId,
        ref: 'Theme',
      },
    ],
    posts: [
      {
        type: Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
);

UserSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
    collation: {
      locale: 'en',
      strength: 2,
    },
  },
);

export interface IUser extends Document {
  _id: string;
  username: string;
  phone: string;
  photoURL: string;
  email: string;
  password: string;
  themes: ITheme[];
  posts: IPost[];
  createdAt: string;
  updatedAt: string;
}
