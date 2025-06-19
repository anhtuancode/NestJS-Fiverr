import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BinhLuanService } from './binhLuan.service';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';
import { Request } from 'express';
import { UpdateBinhLuanDto } from './dto/updateBinhLuan.dto';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  @SkipPermission()
  @ApiBearerAuth()
  async create(
    @Body() createBinhLuanDto: CreateBinhLuanDto,
    @Req() req: Request,
  ) {
    return await this.binhLuanService.create(createBinhLuanDto, req.user);
  }

  @Get()
  @Public()
  @SkipPermission()
  async FindAll() {
    return await this.binhLuanService.FindAll();
  }

  @Put(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async update(
    @Param('id') id: number,
    @Body() updateBinhLuanDto: UpdateBinhLuanDto,
    @Req() req: Request,
  ) {
    return await this.binhLuanService.update(id, updateBinhLuanDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async delete(@Param('id') id: number, @Req() req: Request) {
    return await this.binhLuanService.delete(id, req.user);
  }

  @Get('lay-binh-luan-theo-cong-viec/:maCongViec')
  @Public()
  @SkipPermission()
  async FindAllFromID(@Param('maCongViec') id: number) {
    return await this.binhLuanService.FindAllFromID(id);
  }
}
