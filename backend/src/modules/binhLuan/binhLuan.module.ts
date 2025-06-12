import { Module } from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { BinhLuanController } from './binhLuan.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService, PrismaService],
})
export class BinhLuanModule {}
