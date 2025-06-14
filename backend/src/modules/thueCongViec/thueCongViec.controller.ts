import { Body, Controller, Get, Post } from '@nestjs/common';
import { ThueCongViecService } from './thueCongViec.service';
import { CreateThueCongViecDto } from './dto/createThueCongViec.dto';

@Controller('thue-cong-viec')
export class ThueCongViecController {
  constructor(private readonly thueCongViecService: ThueCongViecService) {}

  @Get()
  findAll() {
    return this.thueCongViecService.findAll();
  }

  @Post()
  async create(@Body() createThueCongViecDto: CreateThueCongViecDto) {
    return await this.thueCongViecService.create(createThueCongViecDto);
  }
}
