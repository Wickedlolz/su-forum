import { Schema, model, Types } from "mongoose";

const themeSchema = new Schema(
  {
    themeName: {
      type: String,
      required: true,
    },
    subscribers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const Theme = model("Theme", themeSchema);

export default Theme;
