import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBinhLuanDto } from './dto/updateBinhLuan.dto';
import { formatDate } from 'src/common/helper/format-time.helper';

@Injectable()
export class BinhLuanService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBinhLuanDto: CreateBinhLuanDto, user: any) {
    const { ma_cong_viec, noi_dung, sao_binh_luan } = createBinhLuanDto;
    const userId = user.id;
    const date = new Date();

    const result = await this.prismaService.binhLuan.create({
      data: {
        ma_cong_viec: ma_cong_viec,
        ma_nguoi_binh_luan: userId,
        ngay_binh_luan: date,
        noi_dung: noi_dung,
        sao_binh_luan: sao_binh_luan,
      },
    });

    if (!result) throw new BadRequestException('Create Comment fail');

    return result;
  }

  async FindAll() {
    const result = await this.prismaService.binhLuan.findMany();

    if (!result) throw new BadRequestException('Comment not found');
    

    return result;
  }

  async update(id: number, updateBinhLuanDto: UpdateBinhLuanDto, user: any) {
    const commentId = Number(id);
    const userId = Number(user.id);

    // Chặn sửa
    if ('ma_cong_viec' in updateBinhLuanDto) {
      throw new BadRequestException('Không được phép thay đổi!');
    }

    if ('ma_nguoi_binh_luan' in updateBinhLuanDto) {
      throw new BadRequestException('Không được phép thay đổi!');
    }

    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateBinhLuanDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    const data = await this.prismaService.binhLuan.findUnique({
      where: {
        id: commentId,
      },
    });

    console.log(data);

    if(!data) throw new BadRequestException('Comment not found');

    if(data.ma_nguoi_binh_luan !== userId) throw new BadRequestException('You dont have permission to update this comment');

    const result = await this.prismaService.binhLuan.update({
      where: {
        id: commentId,
        ma_nguoi_binh_luan: userId,
      },
      data: {
        ...fieldsToUpdate,
      },
    });

    if (!result) throw new BadRequestException('Update Comment fail');

    return result;
  }

  async delete(id: number, user: any) {
    const commentId = Number(id);
    const userId = Number(user.id);

    const data = await this.prismaService.binhLuan.findUnique({
      where: {
        id: commentId,
      },
    });

    if(!data) throw new BadRequestException('Comment not found');

    if(data.ma_nguoi_binh_luan !== userId) throw new BadRequestException('You dont have permission to delete this comment');

    const result = await this.prismaService.binhLuan.update({
      where: {
        id: commentId,
        ma_nguoi_binh_luan: userId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadRequestException('Delete Comment fail');

    return result;
  }

  async FindAllFromID(id: number) {
    const commentId = Number(id);

    const comments = await this.prismaService.binhLuan.findMany({
      where: {
        ma_cong_viec: commentId,
        isDeleted: false,
      },
      include: {
        NguoiDung: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (!comments) throw new BadRequestException('Comments not found');

    const result = comments.map((comment) => ({
      id: comment.id,
      ngayBinhLuan: comment.ngay_binh_luan? formatDate(comment.ngay_binh_luan) : '', 
      noiDung: comment.noi_dung,
      saoBinhLuan: comment.sao_binh_luan,
      tenNguoiBinhLuan: comment.NguoiDung?.name || 'Ẩn danh',
      avatar: comment.NguoiDung?.avatar || '',
    }));

    return result;
  }
}
