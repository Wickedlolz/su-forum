import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IPost } from 'src/schemas/post.schema';
import { ITheme } from 'src/schemas/theme.schema';
import { IUser } from 'src/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<IPost>,
    @InjectModel('Theme') private readonly themeModel: Model<ITheme>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async getLatestPosts(limit?: number) {
    const posts = await this.postModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('themeId userId')
      .lean();

    return posts;
  }

  async createPost(text: string, userId: string, themeId: string) {
    const post = new this.postModel({
      text,
      userId,
      themeId,
    });

    await post.save();

    await this.userModel.updateOne(
      { _id: userId },
      { $push: { posts: post._id }, $addToSet: { themes: themeId } },
    );

    const updatedTheme = await this.themeModel.findByIdAndUpdate(
      { _id: themeId },
      { $push: { posts: post._id }, $addToSet: { subscribers: userId } },
      { new: true },
    );

    return updatedTheme.populate([
      'posts',
      {
        path: 'posts',
        populate: { path: 'userId', select: '-password' },
      },
    ]);
  }

  async editPost(text: string, userId: string, postId: string) {
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: postId, userId },
      { text },
      { new: true },
    );

    return updatedPost;
  }

  async deletePost(postId: string, themeId: string, userId: string) {
    const deletedPost = await this.postModel.findOneAndDelete({
      _id: postId,
      userId,
    });

    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { posts: postId } },
    );

    await this.themeModel.findOneAndUpdate(
      { _id: themeId },
      { $pull: { posts: postId } },
    );

    return deletedPost;
  }

  async likeUnlikePost(postId: string, userId: string) {
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('Post not found!');
    }

    const isLiked = (post.likes as Types.Array<string | IUser>).includes(
      userId,
    );

    if (isLiked) {
      (post.likes as Types.Array<string | IUser>).pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return post.populate('userId');
  }
}
