import { Body, Controller, Post } from '@nestjs/common';
import { LoaiCongViecService } from './loai-cong-viec.service';
import { CreateLoaiCongViecDto } from './dto/createLoaiCongViec.dto';

@Controller('loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @Post()
  create(@Body() createLoaiCongViecDto: CreateLoaiCongViecDto) {
    return this.loaiCongViecService.create(createLoaiCongViecDto);
  }
}
