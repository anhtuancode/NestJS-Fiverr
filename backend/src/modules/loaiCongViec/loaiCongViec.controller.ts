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
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('loai-cong-viec')
export class LoaiCongViecController {
  constructor(private readonly loaiCongViecService: LoaiCongViecService) {}

  @Post()
  @ApiBearerAuth()
  async create(@Body() createLoaiCongViecDto: CreateLoaiCongViecDto, @Req() req: Request) {
    return await this.loaiCongViecService.create(createLoaiCongViecDto, req.user);
  }

  @Get('search')
  @Public()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: "Lập trình" })
  async search(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search: string,
  ) {
    return await this.loaiCongViecService.search(page, pageSize, search);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.loaiCongViecService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: number) {
    return await this.loaiCongViecService.findOne(id);
  }

  @Put(':id') 
  @ApiBearerAuth()
  async update(
    @Param('id') id: number,
    @Body() updateLoaiCongViecDto: CreateLoaiCongViecDto,
  ) {
    return await this.loaiCongViecService.update(id, updateLoaiCongViecDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  async delete(@Param('id') id: number) {
    return await this.loaiCongViecService.delete(id);
  }
}
