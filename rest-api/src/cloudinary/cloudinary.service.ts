import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    photoURL: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return cloudinary.uploader.upload(photoURL);
  }

  async deleteImage(photoURL: string) {
    return cloudinary.uploader.destroy(photoURL.split('/').pop().split('.')[0]);
  }
}
