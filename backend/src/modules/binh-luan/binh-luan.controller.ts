import { Body, Controller, Post } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  create(@Body() createBinhLuanDto: CreateBinhLuanDto) {
    return this.binhLuanService.create(createBinhLuanDto);
  }
}
