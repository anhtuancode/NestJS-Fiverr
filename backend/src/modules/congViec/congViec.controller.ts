import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CreateCongViecDto } from './dto/CreateCongViec.dto';
import { UpdateCongViecDto } from './dto/UpdateCongViec.dto';
@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post()
  async create(@Body() congViecViewDto: CreateCongViecDto) {
    return await this.congViecService.create(congViecViewDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.congViecService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCongViecDto: UpdateCongViecDto,
  ) {
    return await this.congViecService.update(id, updateCongViecDto);
  }

  @Get('phan-trang-tim-kiem')
  async search(@Query('keyword') keyword: string, @Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.congViecService.search(keyword, page, pageSize);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.congViecService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.congViecService.findOne(id);
  }

  @Get('lay-menu-loai-cong-viec')
  async layMenuLoaiCongViec() {
    return await this.congViecService.layMenuLoaiCongViec();
  }
}
