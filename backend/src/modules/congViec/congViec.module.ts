import { Module } from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CongViecController } from './congViec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CongViecController],
  providers: [CongViecService, PrismaService],
})
export class CongViecModule {}
