import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChiTietLoaiCongViecDto } from './dto/updateChiTietLoaiCongViec.dto';
import { CreateChiTietLoaiCongViecDto } from './dto/createChiTietLoaiCongViec.dto';

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

  async findByLoaiCongViecId(page: number, pageSize: number, keyword: string) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;
    keyword = keyword ? keyword.trim() : '';

    const skip = (page - 1) * pageSize;

    const result = await this.prismaService.loaiCongViec.findMany({
      include: {
        ChiTietLoaiCongViec: {
          where: {
            ten_chi_tiet: { contains: keyword },
            isDeleted: false,
          },
          select: {
            id: true,
            ten_chi_tiet: true,
            hinh_anh: true,
          },
        },
      },
    });

    if (!result) throw new BadRequestException('Job not found');

    const filtered = result.filter(
      (lcv) => lcv.ChiTietLoaiCongViec.length > 0,
    );

    // B3: Phân trang theo nhóm
    const totalItem = filtered.length;
    const totalPage = Math.ceil(totalItem / pageSize);
    const paginated = filtered.slice(skip, skip + pageSize);

    // B4: Format dữ liệu
    const formatted = paginated.map((item) => ({
      id: item.id,
      tenNhom: item.ten_loai_cong_viec,
      maLoai: item.id,
      dsChiTietLoai: item.ChiTietLoaiCongViec.map((ct) => ({
        id: ct.id,
        tenChiTiet: ct.ten_chi_tiet,
      })),
    }));

    return {
      page,
      pageSize,
      totalItem,
      totalPage,
      data: formatted,
    };
  }
}
