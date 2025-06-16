import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ThueCongViecService } from './thueCongViec.service';
import { CreateThueCongViecDto } from './dto/createThueCongViec.dto';
import { UpdateThueCongViecDto } from './dto/updateThueCongViec.dto';
import { Request } from 'express';

@Controller('thue-cong-viec')
export class ThueCongViecController {
  constructor(private readonly thueCongViecService: ThueCongViecService) {}

  @Get()
  async findAll() {
    return await this.thueCongViecService.findAll();
  }

  @Post('hoan-thanh/:id')
  async hoanThanh(@Param('id') id: number, @Req() req: Request) {
    return await this.thueCongViecService.hoanThanh(id, req.user);
  }

  @Post()
  async create(@Body() createThueCongViecDto: CreateThueCongViecDto) {
    return await this.thueCongViecService.create(createThueCongViecDto);
  }

  @Get('hoan-thanh')
  async findAllHoanThanh(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.thueCongViecService.findAllHoanThanh(page, pageSize);
  }

  @Get('chua-hoan-thanh')
  async findAllChuaHoanThanh(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.thueCongViecService.findAllChuaHoanThanh(page, pageSize);
  }

  @Get('danh-sach-da-thue')
  async findAllDaThue(@Query('page') page: number, @Query('pageSize') pageSize: number, @Req() req: Request) {
    return await this.thueCongViecService.findAllDaThue(page, pageSize, req.user);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.thueCongViecService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateThueCongViecDto :UpdateThueCongViecDto) {
    return await this.thueCongViecService.update(id, updateThueCongViecDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.thueCongViecService.delete(id);
  }

}
