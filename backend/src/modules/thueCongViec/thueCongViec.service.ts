import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateThueCongViecDto } from './dto/createThueCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateThueCongViecDto } from './dto/updateThueCongViec.dto';
import { create } from 'domain';

@Injectable()
export class ThueCongViecService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const result = await this.prismaService.thueCongViec.findMany({
      where: {
        isDeleted: false,
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((item) => ({
      id: item.id,
      maCongViec: item.ma_cong_viec,
      maNguoiThue: item.ma_nguoi_thue,
      ngayThue: item.ngay_thue ? item.ngay_thue.toISOString() : null,
      hoanThanh: item.hoan_thanh,
    }));

    return data;
  }

  async create(createThueCongViecDto: CreateThueCongViecDto, user: any) {
    const { ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh } =
      createThueCongViecDto;
    const userId = Number(user.id);

    const existJob = await this.prismaService.congViec.findUnique({
      where: { id: ma_cong_viec },
    });

    const existUser = await this.prismaService.nguoiDung.findUnique({
      where: { id: ma_nguoi_thue },
    });

    if (!existUser) throw new BadRequestException('User not found');
    if (!existJob) throw new BadRequestException('Job not found');

    const formattedDate = new Date(ngay_thue).toISOString();

    const result = await this.prismaService.thueCongViec.create({
      data: {
        ma_cong_viec,
        ma_nguoi_thue,
        ngay_thue: formattedDate,
        hoan_thanh,
        createdBy: userId,
      },
    });

    if (!result)
      throw new BadRequestException(
        'Create failed. Please check your information again',
      );

    return {
      id: result.id,
      ma_cong_viec: result.ma_cong_viec,
      ma_nguoi_thue: result.ma_nguoi_thue,
      ngay_thue: result.ngay_thue,
      hoan_thanh: result.hoan_thanh,
      createBy: result.createdBy,
    };
  }

  async findOne(id: number) {
    const jobId = Number(id);
    const result = await this.prismaService.thueCongViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!result) throw new BadRequestException('Not found');

    const data = {
      id: result.id,
      maCongViec: result.ma_cong_viec,
      maNguoiThue: result.ma_nguoi_thue,
      ngayThue: result.ngay_thue ? result.ngay_thue.toISOString() : null,
      hoanThanh: result.hoan_thanh,
    };

    return data;
  }

  async update(
    id: number,
    updateThueCongViecDto: UpdateThueCongViecDto,
    user: any,
  ) {
    const jobId = Number(id);
    const userId = Number(user.id);

    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateThueCongViecDto).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    if (fieldsToUpdate.ngay_thue) {
      const date = new Date(fieldsToUpdate.ngay_thue);
      if (isNaN(date.getTime())) {
        throw new BadRequestException('Invalid ngay_thue date format');
      }
      fieldsToUpdate.ngay_thue = date;
    }

    if (fieldsToUpdate.ma_nguoi_thue) {
      const userExists = await this.prismaService.nguoiDung.findUnique({
        where: { id: Number(fieldsToUpdate.ma_nguoi_thue) },
      });

      if (!userExists) {
        throw new BadRequestException(
          `User not found`,
        );
      }
    }

    const existJob = await this.prismaService.thueCongViec.findUnique({
      where: { id: jobId },
    });

    if (!existJob) throw new BadRequestException('Job not found');

    if (existJob.createdBy !== userId)
      throw new BadRequestException(
        'You dont have permission to update this job',
      );

    const result = await this.prismaService.thueCongViec.update({
      where: {
        id: jobId,
        createdBy: userId,
      },
      data: fieldsToUpdate,
    });

    if (!result) throw new BadRequestException('Update failed');

    const data = {
      id: result.id,
      maCongViec: result.ma_cong_viec,
      maNguoiTao: result.createdBy,
      maNguoiThue: result.ma_nguoi_thue,
      ngayThue: result.ngay_thue ? result.ngay_thue.toISOString() : null,
      hoanThanh: result.hoan_thanh,
    };

    return data;
  }

  async delete(id: number, user: any) {
    const jobId = Number(id);
    const userId = Number(user.id);

    const existJob = await this.prismaService.thueCongViec.findUnique({
      where: { id: jobId },
    });

    if (!existJob) throw new BadRequestException('Job not found');

    const result = await this.prismaService.thueCongViec.update({
      where: {
        id: jobId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadRequestException('Delete failed');
    if(result.createdBy !== userId) throw new BadRequestException('You dont have permission to delete this job');

    const data = {
      id: result.id,
      maCongViec: result.ma_cong_viec,
      maNguoiTao: result.createdBy,
      maNguoiThue: result.ma_nguoi_thue,
      ngayThue: result.ngay_thue ? result.ngay_thue.toISOString() : null,
      hoanThanh: result.hoan_thanh,
    };
    return data;
  }

  async findAllHoanThanh(page: number, pageSize: number) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;

    const skip = (page - 1) * pageSize;

    const take = pageSize;

    const result = await this.prismaService.thueCongViec.findMany({
      where: {
        hoan_thanh: true,
        isDeleted: false,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const totalItem = await this.prismaService.thueCongViec.count({
      where: {
        hoan_thanh: true,
        isDeleted: false,
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = result.map((item) => ({
      id: item.id,
      maCongViec: item.ma_cong_viec,
      maNguoiThue: item.ma_nguoi_thue,
      ngayThue: item.ngay_thue ? item.ngay_thue.toISOString() : null,
      hoanThanh: item.hoan_thanh,
    }));

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      data: data,
    };
  }

  async findAllChuaHoanThanh(page: number, pageSize: number) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;

    const skip = (page - 1) * pageSize;

    const take = pageSize;

    const result = await this.prismaService.thueCongViec.findMany({
      where: {
        hoan_thanh: false,
        isDeleted: false,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((item) => ({
      id: item.id,
      maCongViec: item.ma_cong_viec,
      maNguoiThue: item.ma_nguoi_thue,
      ngayThue: item.ngay_thue ? item.ngay_thue.toISOString() : null,
      hoanThanh: item.hoan_thanh,
    }));

    const totalItem = await this.prismaService.thueCongViec.count({
      where: {
        hoan_thanh: true,
        isDeleted: false,
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      data: data,
    };
  }

  async findAllDaThue(page: number, pageSize: number, user: any) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;

    const skip = (page - 1) * pageSize;

    const take = pageSize;

    const userId = user.id;

    const result = await this.prismaService.thueCongViec.findMany({
      where: {
        ma_nguoi_thue: userId,
        isDeleted: false,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const totalItem = await this.prismaService.thueCongViec.count({
      where: {
        ma_nguoi_thue: userId,
        isDeleted: false,
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      data: result,
    };
  }

  async hoanThanh(id: number, user: any) {
    const userId = user.id;
    const jobId = Number(id);

    const job = await this.prismaService.thueCongViec.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new BadRequestException('Job not found');

    if (job.createdBy !== userId)
      throw new BadRequestException('You are not the owner of this job');

    const result = await this.prismaService.thueCongViec.update({
      where: { id: jobId, createdBy: userId },
      data: { hoan_thanh: true },
    });
    if (!result) throw new BadRequestException('Update failed');

    const data = {
      id: result.id,
      maCongViec: result.ma_cong_viec,
      maNguoiTao: result.createdBy,
      maNguoiThue: result.ma_nguoi_thue,
      ngayThue: result.ngay_thue ? result.ngay_thue.toISOString() : null,
      hoanThanh: result.hoan_thanh,
    };

    return data;
  }
}
