import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { LoaiCongViecService } from './loaiCongViec.service';
import { CreateLoaiCongViecDto } from './dto/createLoaiCongViec.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { Request } from 'express';

@Controller('loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @Post()
  async create(@Body() createLoaiCongViecDto: CreateLoaiCongViecDto) {
    return await this.loaiCongViecService.create(createLoaiCongViecDto);
  }

  @Public()
  @Get('search')
  async search(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search: string,
  ) {
    return await this.loaiCongViecService.search(page, pageSize, search);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.loaiCongViecService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.loaiCongViecService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLoaiCongViecDto: CreateLoaiCongViecDto,
  ) {
    return await this.loaiCongViecService.update(id, updateLoaiCongViecDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.loaiCongViecService.delete(id);
  }
}
