import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ChiTietLoaiCongViecService } from './chiTietLoaiCongViec.service';
import { CreateChiTietLoaiCongViecDto } from './dto/chiTietLoaiCongViec.dto';
import { ProtectGuard } from '../auth/protect/protect.guard';

@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService) {}

  @UseGuards(ProtectGuard)
  @Post()
  create(@Body() createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
    return this.chiTietLoaiCongViecService.create(createChiTietLoaiCongViecDto);
  }
}
