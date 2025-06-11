import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CLOUD_API_KEY, CLOUD_API_SECRET } from '../constant/app.constant';
import { Readable } from 'stream';

// Configuration
cloudinary.config({
  cloud_name: 'dgzknzxns',
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export const uploadImage = async (fileBuffer: Buffer): Promise<UploadApiResponse> => {
  return await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'images' },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result as UploadApiResponse);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};
