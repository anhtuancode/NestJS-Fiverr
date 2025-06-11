import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from 'src/common/multer/cloud.result';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async uploadAvatar(file: Express.Multer.File, user: any) {
    if (!user) throw new BadRequestException('Not found user');
    const userId = Number(user.id);

    if (!file) throw new Error('No file uploaded');

    if (user?.avatar) {
      await cloudinary.uploader.destroy(user.avatar);
    }

    const result = await uploadImage(file.buffer);

    await this.prismaService.nguoiDung.update({
      where: {
        id: userId,
      },
      data:{
        avatar: result.public_id
      }
    });

    return {
      folder: result.asset_folder,
      filename: file.originalname,
      imgUrl: result.secure_url,
    };
  }
}
