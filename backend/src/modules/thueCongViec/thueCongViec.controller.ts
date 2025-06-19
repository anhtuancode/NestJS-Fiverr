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
import { ThueCongViecService } from './thueCongViec.service';
import { CreateThueCongViecDto } from './dto/createThueCongViec.dto';
import { UpdateThueCongViecDto } from './dto/updateThueCongViec.dto';
import { Request } from 'express';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';

@Controller('thue-cong-viec')
export class ThueCongViecController {
  constructor(private readonly thueCongViecService: ThueCongViecService) {}

  @Get()
  @Public()
  async findAll() {
    return await this.thueCongViecService.findAll();
  }

  @Post('hoan-thanh/:id')
  @ApiBearerAuth()
  @SkipPermission()
  async hoanThanh(@Param('id') id: number, @Req() req: Request) {
    return await this.thueCongViecService.hoanThanh(id, req.user);
  }

  @Post()
  @ApiBearerAuth()
  @SkipPermission()
  async create(@Body() createThueCongViecDto: CreateThueCongViecDto, @Req() req: Request) {
    return await this.thueCongViecService.create(createThueCongViecDto, req.user);
  }

  @Get('hoan-thanh')
  @Public()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  async findAllHoanThanh(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.thueCongViecService.findAllHoanThanh(page, pageSize);
  }

  @Get('chua-hoan-thanh')
  @Public()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  async findAllChuaHoanThanh(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.thueCongViecService.findAllChuaHoanThanh(page, pageSize);
  }

  @Get('danh-sach-da-thue')
  @ApiBearerAuth()
  @SkipPermission()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  async findAllDaThue(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Req() req: Request,
  ) {
    return await this.thueCongViecService.findAllDaThue(
      page,
      pageSize,
      req.user,
    );
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: number) {
    return await this.thueCongViecService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async update(
    @Param('id') id: number,
    @Body() updateThueCongViecDto: UpdateThueCongViecDto,
    @Req() req: Request,
  ) {
    return await this.thueCongViecService.update(id, updateThueCongViecDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async delete(@Param('id') id: number, @Req() req: Request) {
    return await this.thueCongViecService.delete(id, req.user);
  }
}
