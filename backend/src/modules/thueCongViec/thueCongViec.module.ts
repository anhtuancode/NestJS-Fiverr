import { Module } from '@nestjs/common';
import { ThueCongViecService } from './thueCongViec.service';
import { ThueCongViecController } from './thueCongViec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ThueCongViecController],
  providers: [ThueCongViecService, PrismaService],
})
export class ThueCongViecModule {}
