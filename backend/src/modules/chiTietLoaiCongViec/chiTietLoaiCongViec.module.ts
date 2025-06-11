import { Module } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chiTietLoaiCongViec.service';
import { ChiTietLoaiCongViecController } from './chiTietLoaiCongViec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChiTietLoaiCongViecController],
  providers: [ChiTietLoaiCongViecService, PrismaService],
})
export class ChiTietLoaiCongViecModule {}
