import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChiTietLoaiCongViecDto {
  @ApiProperty({
    default: 'Thiết kế logo',
  })
  @IsString({ message: 'ten_chi_tiet must be string!' })
  @IsNotEmpty({ message: 'ten_chi_tiet is required!' })
  ten_chi_tiet: string;

  @ApiProperty({
    default: 'hinh_anh_logo_design.png',
  })
  @IsString({ message: 'hinh_anh must be string!' })
  @IsNotEmpty({ message: 'hinh_anh is required!' })
  hinh_anh: string;

  @ApiProperty({ default: '1' })
  @IsNumber({}, { message: 'ma_loai_cong_viec must be number!' })
  @IsNotEmpty({ message: 'ma_loai_cong_viec is required!' })
  ma_loai_cong_viec: number;
}
