import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CongViecViewDto } from './dto/CongViecView.dto';

@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post()
  async create(@Body() congViecViewDto: CongViecViewDto) {
    return await this.congViecService.create(congViecViewDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.congViecService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() congViecViewDto: CongViecViewDto) {
    return await this.congViecService.update(id, congViecViewDto);
  }

}
