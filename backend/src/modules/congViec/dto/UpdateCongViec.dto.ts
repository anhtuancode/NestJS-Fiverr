import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCongViecDto {
    @ApiProperty({
        default: 'Thiết kế website'
    })
    @IsOptional()
    @IsString({ message: 'Tên công việc phải là chuỗi!' })
    ten_cong_viec?: string;

    @ApiProperty({
        default: 4
    })
    @IsOptional()
    @IsNumber({}, { message: 'Đánh giá phải là số!' })
    danh_gia?: number;

    @ApiProperty({
        default: 500000
    })
    @IsOptional()
    @IsNumber({}, { message: 'Giá tiền phải là số!' })
    gia_tien?: number;

    @ApiProperty({
        default: 'https://example.com/image.jpg'
    })
    @IsOptional()
    @IsString({ message: 'Hình ảnh phải là chuỗi!' })
    hinh_anh?: string;

    @ApiProperty({
        default: 'Thiết kế website bán hàng chuẩn SEO'
    })
    @IsOptional()
    @IsString({ message: 'Mô tả phải là chuỗi!' })
    mo_ta?: string;

    @ApiProperty({
        default: 101
    })
    @IsOptional()
    @IsNumber({}, { message: 'Mã chi tiết loại công việc phải là số!' })
    ma_chi_tiet_loai?: number;

    @ApiProperty({
        default: 'Thiết kế website chuẩn SEO, tốc độ cao'
    })
    @IsOptional()
    @IsString({ message: 'Mô tả ngắn phải là chuỗi!' })
    mo_ta_ngan?: string;

    @ApiProperty({
        default: 4.5
    })
    @IsOptional()
    @IsNumber({}, { message: 'Số sao phải là số!' })
    sao_cong_viec?: number;
}