import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.binhLuanService.delete(id);
  }

  @Get('lay-binh-luan-theo-cong-viec/:id')
  async FindAllFromID(@Param('id') id: number) {
    return await this.binhLuanService.FindAllFromID(id);
  }
}
