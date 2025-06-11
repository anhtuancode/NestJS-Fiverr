import { Module } from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { BinhLuanController } from './binhLuan.controller';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService],
})
export class BinhLuanModule {}
