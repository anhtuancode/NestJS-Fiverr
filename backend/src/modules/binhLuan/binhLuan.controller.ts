import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';
import { ProtectGuard } from '../auth/protect/protect.guard';
import { Request } from 'express';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  @UseGuards(ProtectGuard)
  create(@Body() createBinhLuanDto: CreateBinhLuanDto, @Req() req: Request) {
    return this.binhLuanService.create(createBinhLuanDto, req.user);
  }
}
