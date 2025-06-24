import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoaiCongViecDto } from './dto/createLoaiCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoaiCongViecService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLoaiCongViecDto: CreateLoaiCongViecDto, user: any) {
    const { ten_loai_cong_viec } = createLoaiCongViecDto;
    const userId = user.id;

    const result = await this.prismaService.loaiCongViec.create({
      data: { ten_loai_cong_viec },
    });

    if (!result)
      throw new BadRequestException(
        'Create failed. Please check your information again',
      );

    return result;
  }

  async findAll() {
    const result = await this.prismaService.loaiCongViec.findMany({
      where: {
        isDeleted: false,
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((item) => ({
      id: item.id,
      tenLoaiCongViec: item.ten_loai_cong_viec,
    }));

    return data;
  }

  async findOne(id: number) {
    const typeJodId = Number(id);
    const result = await this.prismaService.loaiCongViec.findUnique({
      where: {
        id: typeJodId,
        isDeleted: false,
      },
    });

    if (!result) throw new BadRequestException('Type Job not found');

    return {
      id: result.id,
      tenLoaiCongViec: result.ten_loai_cong_viec,
    };
  }

  async update(id: number, updateLoaiCongViecDto: CreateLoaiCongViecDto) {
    const typeJodId = Number(id);

    const { ten_loai_cong_viec } = updateLoaiCongViecDto;

    const result = await this.prismaService.loaiCongViec.update({
      where: {
        id: typeJodId,
      },
      data: {
        ten_loai_cong_viec: ten_loai_cong_viec,
      },
    });

    if (!result) throw new BadRequestException('Update failed');

    return {
      id: result.id,
      tenLoaiCongViec: result.ten_loai_cong_viec,
    };
  }

  async delete(id: number) {
    const typeJodId = Number(id);

    const result = await this.prismaService.loaiCongViec.update({
      where: {
        id: typeJodId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadRequestException('Delete failed');

    return {
      id: result.id,
      tenLoaiCongViec: result.ten_loai_cong_viec,
    };
  }

  async search(page: number, pageSize: number, search: string) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;
    search = search ? search.trim() : '';

    const skip = (page - 1) * pageSize;

    const where = { ten_loai_cong_viec: { contains: search }, isDeleted: false };

    const result = await this.prismaService.loaiCongViec.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result || result.length === 0)
      throw new BadRequestException('Type Job not found');

    const totalItem = await this.prismaService.loaiCongViec.count({
      where: where,
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }
}
