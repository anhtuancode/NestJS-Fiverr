import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChiTietLoaiCongViecDto } from './dto/chiTietLoaiCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChiTietLoaiCongViecService {
    constructor(private readonly prismaService: PrismaService) {}
    create(createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
        const {ten_chi_tiet, hinh_anh, ma_loai_cong_viec} = createChiTietLoaiCongViecDto

        const result = this.prismaService.chiTietLoaiCongViec.create({
            data:{
                ten_chi_tiet: ten_chi_tiet,
                hinh_anh: hinh_anh,
                ma_loai_cong_viec: ma_loai_cong_viec
            }
        })

        if(!result){
            throw new BadRequestException('Create failed. Please check your information again');
        }

        return result;
    }
}
