import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';

@Injectable()
export class BinhLuanService {
    create(createBinhLuanDto: CreateBinhLuanDto) {
        return 'This action adds a new binhLuan';
    }
}
