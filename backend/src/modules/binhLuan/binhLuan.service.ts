import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/createBinhLuan.dto';

@Injectable()
export class BinhLuanService {
    create(createBinhLuanDto: CreateBinhLuanDto, user: any) {
        const { maCongViec, noiDung, saoBinhLuan } = createBinhLuanDto;
        const userId = user.id;
        const date = new Date();

        console.log(maCongViec, noiDung, saoBinhLuan, userId, date);    

        return 'This action adds a new binhLuan';
    }
}
