import { Module } from '@nestjs/common';
import { LoaiCongViecService } from './loaiCongViec.service';
import { LoaiCongViecController } from './loaiCongViec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LoaiCongViecController],
  providers: [LoaiCongViecService, PrismaService],
})
export class LoaiCongViecModule {}
