import { Schema, model, Types } from "mongoose";

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
    themeId: {
      type: Types.ObjectId,
      ref: "Theme",
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
