import { Body, Controller, Post } from '@nestjs/common';
import { CongViecService } from './cong-viec.service';
import { CreateJobDto } from './dto/createJob.dto';

@Controller('cong-viec')
export class CongViecController {
  constructor(private readonly congViecService: CongViecService) {}

  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    return await this.congViecService.create(createJobDto);
  }
}
