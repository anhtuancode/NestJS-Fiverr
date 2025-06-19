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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CongViecService } from './congViec.service';
import { CreateCongViecDto } from './dto/CreateCongViec.dto';
import { UpdateCongViecDto } from './dto/UpdateCongViec.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { UploadImageDto } from './dto/UploadImage.dto';
import { Public } from 'src/common/decorator/public.decorator';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { Request } from 'express';
@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post()
  @ApiBearerAuth()
  @SkipPermission()
  async create(@Body() congViecViewDto: CreateCongViecDto) {
    return await this.congViecService.create(congViecViewDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async delete(@Param('id') id: number, @Req() req: Request) {
    return await this.congViecService.delete(id, req.user);
  }

  @Post('upload-image/:maCongViec')
  @UseInterceptors(FileInterceptor('hinh_anh'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @SkipPermission()
  @ApiBody({
    description: 'List of cats',
    type: UploadImageDto,
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('maCongViec') id: number,
    @Req() req: Request,
  ) {
    return await this.congViecService.uploadImage(file, id, req.user);
  }

  @Put(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async update(
    @Param('id') id: number,
    @Body() updateCongViecDto: UpdateCongViecDto,
    @Req() req: Request,
  ) {
    return await this.congViecService.update(id, updateCongViecDto, req.user);
  }

  @Get('search')
  @Public()
  @ApiQuery({ name: 'keyword', required: false, example: 'abc'})
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  async search(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.congViecService.search(keyword, page, pageSize);
  }

  @Get('lay-menu-loai-cong-viec')
  @Public()
  async layMenuLoaiCongViec() {
    return await this.congViecService.layMenuLoaiCongViec();
  }

  @Get('lay-menu-loai-cong-viec/:id')
  @Public()
  async layMenuLoaiCongViecbyId(@Param('id') id: number) {
    return await this.congViecService.layMenuLoaiCongViecbyId(id);
  }

  @Get('lay-theo-chi-tiet-loai/:maChiTietLoai')
  @Public()
  async layTheoChiTietLoai(@Param('maChiTietLoai') id: number) {
    return await this.congViecService.layTheoChiTietLoai(id);
  }

  @Get('lay-cong-viec-chi-tiet/:maCongViec')
  @Public()
  async layCongViecChiTiet(@Param('maCongViec') id: number) {
    return await this.congViecService.layCongViecChiTiet(id);
  }

  @Get('lay-danh-sach-theo-ten-cong-viec/:tenCongViec')
  @Public()
  async layDanhSachTheoTenCongViec(@Param('tenCongViec') tenCongViec: string) {
    return await this.congViecService.layDanhSachTheoTenCongViec(tenCongViec);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.congViecService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: number) {
    return await this.congViecService.findOne(id);
  }
}
