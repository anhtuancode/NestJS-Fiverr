import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateChiTietLoaiCongViecDto {
  @ApiProperty({
    default: 'Thiết kế logo',
  })
  @IsString({ message: 'ten_chi_tiet must be string!' })
  @IsOptional()
  ten_chi_tiet?: string;

  @ApiProperty({
    default: 'hinh_anh_logo_design.png',
  })
  @IsString({ message: 'hinh_anh must be string!' })
  @IsOptional()
  hinh_anh?: string;

  @ApiProperty({ default: '1' })
  @IsNumber({}, { message: 'ma_loai_cong_viec must be number!' })
  @IsOptional()
  ma_loai_cong_viec?: number;
}
