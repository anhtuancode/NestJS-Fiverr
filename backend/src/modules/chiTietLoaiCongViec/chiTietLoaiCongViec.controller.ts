import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { CreateChiTietLoaiCongViecDto } from './dto/createChiTietLoaiCongViec.dto';
import { ChiTietLoaiCongViecService } from './chiTietLoaiCongViec.service';
import { UpdateChiTietLoaiCongViecDto } from './dto/updateChiTietLoaiCongViec.dto';

@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService) {}

  @Post()
  async create(@Body() createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
    return await this.chiTietLoaiCongViecService.create(createChiTietLoaiCongViecDto);
  }

  @Get()
  async findAll() {
    return await this.chiTietLoaiCongViecService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateChiTietLoaiCongViecDto: UpdateChiTietLoaiCongViecDto) {
    return await this.chiTietLoaiCongViecService.update(id, updateChiTietLoaiCongViecDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.chiTietLoaiCongViecService.delete(id);
  }

  @Get('search')
  async findByLoaiCongViecId(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('keyword') keyword: string) {
    return await this.chiTietLoaiCongViecService.findByLoaiCongViecId(page, pageSize, keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.chiTietLoaiCongViecService.findOne(id);
  }

  // @Post('them-nhom-chi-tiet-loai')
  // async themChiTietLoai(@Body() createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto) {
    
  // }
}

