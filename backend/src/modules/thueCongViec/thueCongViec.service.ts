import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateThueCongViecDto } from './dto/createThueCongViec.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThueCongViecService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll() {
        return "ok"
    }

    async create(createThueCongViecDto: CreateThueCongViecDto) {
        const { ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh } = createThueCongViecDto

        const result = await this.prismaService.thueCongViec.create({data: {ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh}});

        if(!result) throw new BadRequestException('Create failed. Please check your information again');

        return "ok"
    }
}
