import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChiTietLoaiCongViecDto } from './dto/CreateChiTietLoaiCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChiTietLoaiCongViecDto } from './dto/updateChiTietLoaiCongViec.dto';

@Injectable()
export class ChiTietLoaiCongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
    const { ten_chi_tiet, hinh_anh, ma_loai_cong_viec } =
      createChiTietLoaiCongViecDto;

    const result = await this.prismaService.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: ten_chi_tiet,
        hinh_anh: hinh_anh,
        ma_loai_cong_viec: ma_loai_cong_viec,
      },
    });

    if (!result) {
      throw new BadRequestException(
        'Create failed. Please check your information again',
      );
    }

    return result;
  }

  async findAll() {
    const result = await this.prismaService.chiTietLoaiCongViec.findMany();

    if (!result) {
      throw new BadRequestException('Get all data failed');
    }

    return result;
  }

  async findOne(id: number) {
    const jobId = Number(id);
    const result = await this.prismaService.chiTietLoaiCongViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!result) throw new BadRequestException('Job not found');

    return result;
  }

  async update(
    id: number,
    updateChiTietLoaiCongViecDto: UpdateChiTietLoaiCongViecDto,
  ) {
    const jobId = Number(id);

    const job = await this.prismaService.chiTietLoaiCongViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateChiTietLoaiCongViecDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    const result = await this.prismaService.chiTietLoaiCongViec.update({
      where: {
        id: jobId,
      },
      data: fieldsToUpdate,
    });

    if (!result) {
      throw new BadRequestException('Update failed');
    }
    return result;
  }

  async delete(id: number) {
    const jobId = Number(id);
    const result = await this.prismaService.chiTietLoaiCongViec.update({
      where: {
        id: jobId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadRequestException('Delete failed');

    return result;
  }
}
