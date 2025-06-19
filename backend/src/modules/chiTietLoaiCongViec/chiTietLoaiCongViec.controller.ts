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
import { CreateChiTietLoaiCongViecDto } from './dto/createChiTietLoaiCongViec.dto';
import { ChiTietLoaiCongViecService } from './chiTietLoaiCongViec.service';
import { UpdateChiTietLoaiCongViecDto } from './dto/updateChiTietLoaiCongViec.dto';
import { CreateNhomChiTietLoaiCongViecDto } from './dto/createNhomChiTiet.dto';
import { UploadImageNhomDto } from './dto/uploadImageNhomChiTietLoai.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { UpdateNhomChiTietLoaiCongViecDto } from './dto/updateNhomChiTietLoaiCongViec.dto';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('chi-tiet-loai-cong-viec')
export class ChiTietLoaiCongViecController {
  constructor(
    private readonly chiTietLoaiCongViecService: ChiTietLoaiCongViecService,
  ) {}

  @Post()
  @ApiBearerAuth()
  async create(
    @Body() createChiTietLoaiCongViecDto: CreateChiTietLoaiCongViecDto,
  ) {
    return await this.chiTietLoaiCongViecService.create(
      createChiTietLoaiCongViecDto,
    );
  }

  @Get()
  @Public()
  async findAll() {
    return await this.chiTietLoaiCongViecService.findAll();
  }

  @Put('sua-nhom-chi-tiet-loai/:id')
  @ApiBearerAuth()
  async updateNhomChiTietLoai(
    @Body() updateNhomChiTietLoaiCongViecDto: UpdateNhomChiTietLoaiCongViecDto,
    @Req() req: Request,
    @Param('id') id: number,
  ) {
    return await this.chiTietLoaiCongViecService.updateNhomChiTietLoai(
      updateNhomChiTietLoaiCongViecDto,
      req.user,
      id,
    );
  }

  @Put(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateChiTietLoaiCongViecDto: UpdateChiTietLoaiCongViecDto,
  ) {
    return await this.chiTietLoaiCongViecService.update(
      id,
      updateChiTietLoaiCongViecDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    return await this.chiTietLoaiCongViecService.delete(id);
  }

  @Get('search')
  @Public()
  @ApiQuery({ name: 'page', required: false , example: 1})
  @ApiQuery({ name: 'pageSize', required: false , example: 10})
  @ApiQuery({ name: 'keyword', required: false , example: 'abc'})
  async findByLoaiCongViecId(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.chiTietLoaiCongViecService.findByLoaiCongViecId(
      page,
      pageSize,
      keyword,
    );
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: number) {
    return await this.chiTietLoaiCongViecService.findOne(id);
  }

  @Post('them-nhom-chi-tiet-loai')
  @ApiBearerAuth()
  async themNhomChiTietLoai(
    @Body() createNhomChiTietLoaiCongViecDto: CreateNhomChiTietLoaiCongViecDto,
    @Req() req: Request,
  ) {
    return await this.chiTietLoaiCongViecService.themNhomChiTietLoai(
      createNhomChiTietLoaiCongViecDto,
      req.user,
    );
  }

  @Post('upload-image-nhom-chi-tiet-loai/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    description: 'List of cats',
    type: UploadImageNhomDto,
  })
  async uploadImageNhomChiTietLoai(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    return await this.chiTietLoaiCongViecService.uploadImageNhomChiTietLoai(
      file,
      id,
      req.user,
    );
  }
}
