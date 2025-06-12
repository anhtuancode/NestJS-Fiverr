import {
  BadGatewayException,
  BadRequestException,
  Body,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongViecDto } from './dto/CreateCongViec.dto';
import { UpdateCongViecDto } from './dto/UpdateCongViec.dto';

@Injectable()
export class CongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(@Body() createCongViecDto: CreateCongViecDto) {
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      nguoi_tao,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      ma_chi_tiet_loai,
      sao_cong_viec,
    } = createCongViecDto;

    const job = await this.prismaService.congViec.create({
      data: {
        ten_cong_viec: ten_cong_viec,
        danh_gia: danh_gia,
        gia_tien: gia_tien,
        nguoi_tao: nguoi_tao,
        hinh_anh: hinh_anh,
        mo_ta: mo_ta,
        mo_ta_ngan: mo_ta_ngan,
        ma_chi_tiet_loai: ma_chi_tiet_loai,
        sao_cong_viec: sao_cong_viec,
      },
    });

    if (!job)
      throw new BadRequestException(
        'Create job failed. Please check your information again',
      );

    return job;
  }

  async delete(id: number) {
    const jobId = Number(id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    const result = await this.prismaService.congViec.update({
      where: {
        id: jobId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadGatewayException('Job not found');

    return result;
  }

  async update(id: number, @Body() updateCongViecDto: UpdateCongViecDto) {
    const jobId = Number(id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    // Chặn sửa người tạo
    if ('nguoi_tao' in updateCongViecDto) {
      throw new BadRequestException('Không được phép thay đổi người tạo!');
    }

    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateCongViecDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    const result = await this.prismaService.congViec.update({
      where: {
        id: jobId,
      },
      data: fieldsToUpdate,
    });

    if (!result)
      throw new BadGatewayException('Update job failed. Please try again!!');

    return result;
  }

  async findAll(page: number, pageSize: number) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;

    const skip = (page - 1) * pageSize;

    const result = await this.prismaService.congViec.findMany({
      where: { isDeleted: false },
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('Job not found');

    const totalItem = await this.prismaService.congViec.count({
      where: { isDeleted: false },
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

  async findOne(id: number) {
    const jobId = Number(id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
        isDeleted: false,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    return job;
  }

  async search(keyword: string, page: number, pageSize: number) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;
    keyword = keyword || '';

    const skip = (page - 1) * pageSize;

    const where = {ten_cong_viec: { contains: keyword }, isDeleted: false};

    const result = await this.prismaService.congViec.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if(!result) throw new BadRequestException('Job not found');

    const totalItem = await this.prismaService.congViec.count({
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

  async layMenuLoaiCongViec() {
    

    return "ok";
  }
}
