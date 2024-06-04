import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/user.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getProfileInfo(userId: string) {
    const user = await this.userModel
      .findOne({ _id: userId }, { password: 0, __v: 0 })
      .lean();

    return user;
  }

  async updateProfileInfo(
    userId: string,
    phone: string,
    username: string,
    email: string,
    photoURL: string,
  ) {
    const user = await this.userModel.findById(userId);

    if (photoURL) {
      if (user.photoURL) {
        await this.cloudinaryService.deleteImage(user.photoURL);
      }

      const uploadedResponse =
        await this.cloudinaryService.uploadImage(photoURL);

      const updatedUser = await this.userModel
        .findOneAndUpdate(
          { _id: userId },
          { phone, username, email, photoURL: uploadedResponse.secure_url },
          { runValidators: true },
        )
        .lean();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = updatedUser;

      return { ...userData, photoURL: uploadedResponse.secure_url };
    }
  }
}
