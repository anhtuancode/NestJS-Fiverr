import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChiTietLoaiCongViecDto } from './dto/updateChiTietLoaiCongViec.dto';
import { CreateChiTietLoaiCongViecDto } from './dto/createChiTietLoaiCongViec.dto';
import { CreateNhomChiTietLoaiCongViecDto } from './dto/createNhomChiTiet.dto';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from 'src/common/multer/cloud.result';
import { UpdateNhomChiTietLoaiCongViecDto } from './dto/updateNhomChiTietLoaiCongViec.dto';

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

    const filtered = result.filter((lcv) => lcv.ChiTietLoaiCongViec.length > 0);

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

  async themNhomChiTietLoai(
    createNhomChiTietLoaiCongViecDto: CreateNhomChiTietLoaiCongViecDto,
    user: any,
  ) {
    const { ten_chi_tiet, ma_loai_cong_viec, danh_sach_chi_tiet } =
      createNhomChiTietLoaiCongViecDto;
    const userId = Number(user.id);

    const existed = await this.prismaService.chiTietLoaiCongViec.findFirst({
      where: {
        ten_chi_tiet: ten_chi_tiet.trim(),
        ma_loai_cong_viec: ma_loai_cong_viec,
        isDeleted: false,
      },
    });

    if (existed) {
      throw new BadRequestException('Tên chi tiết loại công việc đã tồn tại!');
    }

    const result = await this.prismaService.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet: ten_chi_tiet,
        ma_loai_cong_viec: ma_loai_cong_viec,
        danh_sach_chi_tiet: JSON.stringify(danh_sach_chi_tiet ?? []),
        createBy: userId,
      },
    });

    if (!result) {
      throw new BadRequestException(
        'Create failed. Please check your information again',
      );
    }

    return {
      id: result.id,
      tenChiTiet: result.ten_chi_tiet,
      maLoaiCongViec: result.ma_loai_cong_viec,
      danhSachChiTiet: JSON.parse(result.danh_sach_chi_tiet || '[]'),
    };
  }

  async uploadImageNhomChiTietLoai(
    file: Express.Multer.File,
    id: number,
    user: any,
  ) {
    const typeId = Number(id);

    if (!file) throw new Error('No file uploaded');
    if (!user) throw new BadRequestException('Not found user');

    const result = await this.prismaService.chiTietLoaiCongViec.findUnique({
      where: {
        id: typeId,
      },
    });
    if (!result) throw new BadRequestException('Get all data failed');

    // Kiểm tra quyền
    if (result.createBy !== Number(user.id)) {
      throw new ForbiddenException(
        'You do not have permission to update this job',
      );
    }

    if (result?.hinh_anh) {
      await cloudinary.uploader.destroy(result.hinh_anh);
    }

    const imageFile = await uploadImage(file.buffer);

    const data = await this.prismaService.chiTietLoaiCongViec.update({
      where: {
        id: typeId,
        createBy: Number(user.id),
      },
      data: {
        hinh_anh: imageFile.secure_url,
      },
    });

    if (!data)
      throw new BadRequestException(
        'Update failed. Please check your information again',
      );

    return {
      folder: imageFile.asset_folder,
      filename: file.originalname,
      imgUrl: imageFile.secure_url,
    };
  }

  async updateNhomChiTietLoai(
    updateNhomChiTietLoaiCongViecDto: UpdateNhomChiTietLoaiCongViecDto,
    user: any,
    id: number,
  ) {
    const { ten_chi_tiet, ma_loai_cong_viec, danh_sach_chi_tiet } =
      updateNhomChiTietLoaiCongViecDto?? {};
    const typeId = Number(id);

    const result = await this.prismaService.chiTietLoaiCongViec.findUnique({
      where: {
        id: typeId,
      },
    });

    if (!result) throw new BadRequestException('Job detail not found');

    // Kiểm tra quyền
    if (result.createBy !== Number(user.id)) {
      throw new ForbiddenException(
        'You do not have permission to update this job',
      );
    }

    const data = await this.prismaService.chiTietLoaiCongViec.update({
      where: {
        id: typeId,
      },
      data: {
        ten_chi_tiet: ten_chi_tiet,
        ma_loai_cong_viec: ma_loai_cong_viec,
        danh_sach_chi_tiet: JSON.stringify(danh_sach_chi_tiet ?? []),
      },
    });

    if (!data)
      throw new BadRequestException(
        'Update failed. Please check your information again',
      );

    return data;
  }
}
