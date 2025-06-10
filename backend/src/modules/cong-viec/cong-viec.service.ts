import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/createJob.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(@Body() createJobDto: CreateJobDto) {
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
    } = createJobDto;

    console.log({
      ten_cong_viec,
      danh_gia,
      gia_tien,
      nguoi_tao,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      ma_chi_tiet_loai,
      sao_cong_viec,
    });

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
        "Create job failed. Please check your information again",
      );

    return job;
  }
}
