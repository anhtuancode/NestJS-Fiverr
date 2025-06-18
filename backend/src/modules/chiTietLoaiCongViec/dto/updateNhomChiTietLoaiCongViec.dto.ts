  import { ApiProperty } from '@nestjs/swagger';
  import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

  export class UpdateNhomChiTietLoaiCongViecDto {
    @ApiProperty({
      default: 'Thiết kế logo',
    })
    @IsString({ message: 'ten_chi_tiet must be string!' })
    @IsOptional()
    ten_chi_tiet?: string;

    @ApiProperty({ default: '1' })
    @IsNumber({}, { message: 'ma_loai_cong_viec must be number!' })
    @IsOptional()
    ma_loai_cong_viec?: number;

    @ApiProperty({
      default: [1, 2, 3],
      description: 'Danh sách mã chi tiết con thuộc nhóm (có thể rỗng)',
      type: [Number],
    })
    @IsArray({ message: 'danh_sach_chi_tiet must be an array of numbers!' })
    @IsOptional()
    danh_sach_chi_tiet?: number[];
  }
