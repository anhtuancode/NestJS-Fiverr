import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async update(id: number, updateBinhLuanDto: any) {
    const jobId = Number(id);
    const job = await this.prismaService.binhLuan.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    // Chặn sửa người tạo
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

    const result = await this.prismaService.binhLuan.update({
      where: {
        id: jobId,
      },
      data: fieldsToUpdate,
    });

    if(!result) throw new BadRequestException('Update Comment fail');   

    return result;
  }
}
