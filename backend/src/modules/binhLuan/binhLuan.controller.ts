import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';
import { Request } from 'express';
import { UpdateBinhLuanDto } from './dto/updateBinhLuan.dto';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  async create(@Body() createBinhLuanDto: CreateBinhLuanDto, @Req() req: Request) {
    return await this.binhLuanService.create(createBinhLuanDto, req.user);
  }

  @Get()
  async FindAll() {
    return await this.binhLuanService.FindAll();
  } 

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBinhLuanDto: UpdateBinhLuanDto) {
    return await this.binhLuanService.update(id,updateBinhLuanDto);
  }
}
