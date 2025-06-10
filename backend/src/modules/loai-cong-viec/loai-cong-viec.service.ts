import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoaiCongViecDto } from './dto/createLoaiCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoaiCongViecService {
    constructor(private readonly prismaService: PrismaService){}

    create(createLoaiCongViecDto: CreateLoaiCongViecDto) {
        const {ten_loai_cong_viec} = createLoaiCongViecDto

        const result = this.prismaService.loaiCongViec.create({data: {ten_loai_cong_viec}})

        if(!result) throw new BadRequestException('Create type job failed. Please check your information again');


        return result;
    }
}
