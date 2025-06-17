import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CreateCongViecDto } from './dto/CreateCongViec.dto';
import { UpdateCongViecDto } from './dto/UpdateCongViec.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadImageDto } from './dto/UploadImage.dto';
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

  @Post('upload-image/:maCongViec')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadImageDto,
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File,@Param('maCongViec') id: number) {
    return await this.congViecService.uploadImage(file,id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCongViecDto: UpdateCongViecDto,
  ) {
    return await this.congViecService.update(id, updateCongViecDto);
  }

  @Get('search')
  async search(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.congViecService.search(keyword, page, pageSize);
  }

  @Get('lay-menu-loai-cong-viec')
  async layMenuLoaiCongViec() {
    return await this.congViecService.layMenuLoaiCongViec();
  }

  @Get('lay-menu-loai-cong-viec/:id')
  async layMenuLoaiCongViecbyId(@Param('id') id: number) {
    return await this.congViecService.layMenuLoaiCongViecbyId(id);
  }

  @Get('lay-theo-chi-tiet-loai/:maChiTietLoai')
  async layTheoChiTietLoai(@Param('maChiTietLoai') id: number) {
    return await this.congViecService.layTheoChiTietLoai(id);
  }

  @Get('lay-cong-viec-chi-tiet/:maCongViec')
  async layCongViecChiTiet(@Param('maCongViec') id: number) {
    return await this.congViecService.layCongViecChiTiet(id);
  }

  @Get('lay-danh-sach-theo-ten-cong-viec/:tenCongViec')
  async layDanhSachTheoTenCongViec(@Param('tenCongViec') tenCongViec: string) {
    return await this.congViecService.layDanhSachTheoTenCongViec(tenCongViec);
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
}
