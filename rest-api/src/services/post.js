import Post from "../models/post.model.js";
import Theme from "../models/theme.model.js";
import User from "../models/user.model.js";

export const getLatestPosts = async (limit) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("themeId userId")
    .lean();

  return posts;
};

export const createPost = async (text, userId, themeId) => {
  const post = new Post({
    text,
    userId,
    themeId,
  });

  await post.save();

  await User.updateOne(
    { _id: userId },
    { $push: { posts: post._id }, $addToSet: { themes: themeId } }
  );

  const updatedTheme = await Theme.findByIdAndUpdate(
    { _id: themeId },
    { $push: { posts: post._id }, $addToSet: { subscribers: userId } },
    { new: true }
  );

  return updatedTheme;
};

export const editPost = async (text, userId, postId) => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId, userId },
    { text },
    { new: true }
  );

  return updatedPost;
};

export const deletePost = async (postId, themeId, userId) => {
  const deletedPost = await Post.findOneAndDelete({ _id: postId, userId });
  await User.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
  await Theme.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } });

  return deletedPost;
};

export const likePost = async (postId, userId) => {
  const likedPost = await Post.updateOne(
    { _id: postId },
    { $addToSet: { likes: userId } },
    { new: true }
  );

  return likedPost;
};
