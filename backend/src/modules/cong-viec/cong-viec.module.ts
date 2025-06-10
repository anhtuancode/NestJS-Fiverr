import { Module } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CongViecController } from './cong-viec.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CongViecController],
  providers: [CongViecService, PrismaService],
})
export class CongViecModule {}
