import { BadGatewayException, BadRequestException, Body, Injectable } from '@nestjs/common';
import { CongViecViewDto } from './dto/CongViecView.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CongViecService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(@Body() congViecViewDto: CongViecViewDto) {
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
    } = congViecViewDto;
    
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

  async delete(id: number) {
    const jobId = Number(id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException("Job not found");


    const result = await this.prismaService.congViec.update({
      where:{
        id: jobId
      },
      data: {
        isDeleted: true
      }
    })

    if(!result) throw new BadGatewayException("Job not found")

    return result;
  }

  async update(id: number, @Body() CongViecViewDto: CongViecViewDto) {
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
    } = CongViecViewDto;

    const jobId = Number(id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException("Job not found");

    const result = await this.prismaService.congViec.update({
      where: {
        id: jobId,
      },
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

    if(!result) throw new BadGatewayException("Update job failed. Please try again!!")

    return result;
  }
}
