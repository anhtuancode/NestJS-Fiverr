import {
  BadGatewayException,
  BadRequestException,
  Body,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCongViecDto } from './dto/CreateCongViec.dto';
import { UpdateCongViecDto } from './dto/UpdateCongViec.dto';
import { uploadImage } from 'src/common/multer/cloud.result';
import { v2 as cloudinary } from 'cloudinary';

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

    const checkJob = await this.prismaService.chiTietLoaiCongViec.findUnique({
      where:{
        id: ma_chi_tiet_loai,
        isDeleted: false
      }
    })

    if(!checkJob) throw new BadRequestException('Ma chi tiet loai khong hop le');

    const user = await this.prismaService.nguoiDung.findUnique({
      where: {
        id: nguoi_tao,
        isDeleted: false
      },
    });

    if (!user) throw new BadRequestException('User not found');

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

  async delete(id: number, user: any) {
    const jobId = Number(id);
    const userId = Number(user.id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) throw new BadRequestException('Job not found');

    if(job.nguoi_tao !== userId) throw new BadRequestException('You are not the owner of this job');

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

  async update(id: number, @Body() updateCongViecDto: UpdateCongViecDto, user: any) {
    const jobId = Number(id);
    const userId = Number(user.id);

    const job = await this.prismaService.congViec.findUnique({
      where: {
        id: jobId,
        isDeleted: false
      },
    });

    if (!job) throw new BadRequestException('Job not found');
    if(job.nguoi_tao !== userId) throw new BadRequestException('You are not the owner of this job');
    if(!job.ma_chi_tiet_loai) throw new BadRequestException('Ma chi tiet loai khong hop le');

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

  async findAll() {
    const jobs = await this.prismaService.congViec.findMany({
      where: {
        isDeleted: false,
      },
    });

    if (!jobs) throw new BadRequestException('Get all data failed');

    const data = jobs.map((item) => ({
      id: item.id,
      ten_cong_viec: item.ten_cong_viec,
      danh_gia: item.danh_gia,
      gia_tien: item.gia_tien,
      nguoi_tao: item.nguoi_tao,
      hinh_anh: item.hinh_anh,
      mo_ta: item.mo_ta,
      mo_ta_ngan: item.mo_ta_ngan,
      ma_chi_tiet_loai: item.ma_chi_tiet_loai,
      sao_cong_viec: item.sao_cong_viec,
    }));

    return data;
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

    const data = {
      id: job.id,
      ten_cong_viec: job.ten_cong_viec,
      danh_gia: job.danh_gia,
      gia_tien: job.gia_tien,
      nguoi_tao: job.nguoi_tao,
      hinh_anh: job.hinh_anh,
      mo_ta: job.mo_ta,
      mo_ta_ngan: job.mo_ta_ngan,
      ma_chi_tiet_loai: job.ma_chi_tiet_loai,
      sao_cong_viec: job.sao_cong_viec,
    };


    return data;
  }

  async search(keyword: string, page: number, pageSize: number) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;
    keyword = keyword || '';

    const skip = (page - 1) * pageSize;

    const where = { ten_cong_viec: { contains: keyword }, isDeleted: false };

    const result = await this.prismaService.congViec.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('Job not found');

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
    const loaiCongViec = await this.prismaService.loaiCongViec.findMany({
      include: {
        ChiTietLoaiCongViec: {
          include: {
            CongViec: {
              where: {
                isDeleted: false,
              },
            },
          },
        },
      },
    });

    if (!loaiCongViec) throw new BadRequestException('Get all data failed');

    return loaiCongViec.map((loai) => ({
      id: loai.id,
      tenLoaiCongViec: loai.ten_loai_cong_viec,
      dsNhomChiTietLoai: loai.ChiTietLoaiCongViec.map((nhom) => ({
        id: nhom.id,
        tenNhom: nhom.ten_chi_tiet,
        hinhAnh: nhom.hinh_anh,
        maLoaiCongviec: nhom.ma_loai_cong_viec,
        dsChiTietLoai: nhom.CongViec.map((cv) => ({
          id: cv.id,
          tenChiTiet: cv.ten_cong_viec,
        })),
      })),
    }));
  }

  async layMenuLoaiCongViecbyId(id: number) {
    const typeId = Number(id);

    const result = await this.prismaService.loaiCongViec.findUnique({
      where: {
        id: typeId,
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            CongViec: {
              where: {
                isDeleted: false,
              },
            },
          },
        },
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    return {
      id: result.id,
      tenLoaiCongViec: result.ten_loai_cong_viec,
      dsNhomChiTietLoai: result.ChiTietLoaiCongViec.map((nhom) => ({
        id: nhom.id,
        tenNhom: nhom.ten_chi_tiet,
        hinhAnh: nhom.hinh_anh,
        maLoaiCongviec: nhom.ma_loai_cong_viec,
        dsChiTietLoai: nhom.CongViec.map((cv) => ({
          id: cv.id,
          tenChiTiet: cv.ten_cong_viec,
        })),
      })),
    };
  }

  async layTheoChiTietLoai(id: number) {
    const typeId = Number(id);

    const result = await this.prismaService.congViec.findMany({
      where: {
        ma_chi_tiet_loai: typeId,
        isDeleted: false,
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            LoaiCongViec: true,
          },
        },
        NguoiDung: true,
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((cv) => ({
      id: cv.id,
      congViec: {
        id: cv.id,
        tenCongViec: cv.ten_cong_viec,
        danhGia: cv.danh_gia,
        giaTien: cv.gia_tien,
        nguoiTao: cv.nguoi_tao,
        hinhAnh: cv.hinh_anh,
        moTa: cv.mo_ta,
        maChiTietLoaiCongViec: cv.ma_chi_tiet_loai,
        moTaNgan: cv.mo_ta_ngan,
        saoCongViec: cv.sao_cong_viec,
      },
      tenLoaiCongViec:
        cv.ChiTietLoaiCongViec?.LoaiCongViec?.ten_loai_cong_viec || '',
      tenNhomChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenNguoiTao: cv.NguoiDung?.name || 'Không rõ',
      avatar: cv.NguoiDung?.avatar || null,
    }));

    return data;
  }

  async layCongViecChiTiet(id: number) {
    const typeId = Number(id);

    const result = await this.prismaService.congViec.findMany({
      where: {
        id: typeId,
        isDeleted: false,
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            LoaiCongViec: true,
          },
        },
        NguoiDung: true,
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((cv) => ({
      id: cv.id,
      congViec: {
        id: cv.id,
        tenCongViec: cv.ten_cong_viec,
        danhGia: cv.danh_gia,
        giaTien: cv.gia_tien,
        nguoiTao: cv.nguoi_tao,
        hinhAnh: cv.hinh_anh,
        moTa: cv.mo_ta,
        maChiTietLoaiCongViec: cv.ma_chi_tiet_loai,
        moTaNgan: cv.mo_ta_ngan,
        saoCongViec: cv.sao_cong_viec,
      },
      tenLoaiCongViec:
        cv.ChiTietLoaiCongViec?.LoaiCongViec?.ten_loai_cong_viec || '',
      tenNhomChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenNguoiTao: cv.NguoiDung?.name || 'Không rõ',
      avatar: cv.NguoiDung?.avatar || null,
    }));

    return data;
  }

  async layDanhSachTheoTenCongViec(tenCongViec: string) {
    const result = await this.prismaService.congViec.findMany({
      where: {
        ten_cong_viec: tenCongViec,
        isDeleted: false,
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            LoaiCongViec: true,
          },
        },
        NguoiDung: true,
      },
    });

    if (!result) throw new BadRequestException('Get all data failed');

    const data = result.map((cv) => ({
      id: cv.id,
      congViec: {
        id: cv.id,
        tenCongViec: cv.ten_cong_viec,
        danhGia: cv.danh_gia,
        giaTien: cv.gia_tien,
        nguoiTao: cv.nguoi_tao,
        hinhAnh: cv.hinh_anh,
        moTa: cv.mo_ta,
        maChiTietLoaiCongViec: cv.ma_chi_tiet_loai,
        moTaNgan: cv.mo_ta_ngan,
        saoCongViec: cv.sao_cong_viec,
      },
      tenLoaiCongViec:
        cv.ChiTietLoaiCongViec?.LoaiCongViec?.ten_loai_cong_viec || '',
      tenNhomChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenChiTietLoai: cv.ChiTietLoaiCongViec?.ten_chi_tiet || '',
      tenNguoiTao: cv.NguoiDung?.name || 'Không rõ',
      avatar: cv.NguoiDung?.avatar || null,
    }));

    return data;
  }

  async uploadImage(file: Express.Multer.File, id: number, user: any) {
    const typeId = Number(id);
    const userId = Number(user.id);

    console.log(typeId);

    if (!file) throw new Error('No file uploaded');

    const result = await this.prismaService.congViec.findUnique({
      where: {
        id: typeId,
        isDeleted: false,
      },
    });

    if (!result) throw new BadRequestException('Job not found');
    if(result.nguoi_tao !== userId) throw new BadRequestException('You are not the owner of this job');

    if (result?.hinh_anh) {
      await cloudinary.uploader.destroy(result.hinh_anh);
    }

    const fileUpload = await uploadImage(file.buffer);


    await this.prismaService.congViec.update({
      where: {
        id: typeId,
      },
      data: {
        hinh_anh: fileUpload.secure_url,
      },
    });


    return {
      folder: fileUpload.asset_folder,
      filename: file.originalname,
      imgUrl: fileUpload.secure_url,
    };
  }
}
