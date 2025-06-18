import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNhomChiTietLoaiCongViecDto {
  @ApiProperty({
    default: 'Thiết kế nhóm quảng cáo',
    description: 'Tên chi tiết loại công việc',
  })
  @IsString({ message: 'ten_chi_tiet must be string!' })
  @IsNotEmpty({ message: 'ten_chi_tiet is required!' })
  ten_chi_tiet: string;

  @ApiProperty({
    default: 1,
    description: 'Mã loại công việc cha',
  })
  @IsNumber({}, { message: 'ma_loai_cong_viec must be number!' })
  @IsNotEmpty({ message: 'ma_loai_cong_viec is required!' })
  ma_loai_cong_viec: number;

  @ApiProperty({
    default: [1, 2, 3],
    description: 'Danh sách mã chi tiết con thuộc nhóm (có thể rỗng)',
    type: [Number],
  })
  @IsArray({ message: 'danh_sach_chi_tiet must be an array of numbers!' })
  @IsOptional()
  danh_sach_chi_tiet?: number[];
}