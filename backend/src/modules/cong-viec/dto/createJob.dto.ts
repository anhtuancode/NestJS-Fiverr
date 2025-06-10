import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {
    @ApiProperty({
        default: 'Thiết kế website'
    })
    @IsString({ message: 'Tên công việc phải là chuỗi!' })
    @IsNotEmpty({ message: 'Tên công việc không được để trống!' })
    ten_cong_viec: string;

    @ApiProperty({
        default: 4
    })
    @IsNumber({}, { message: 'Đánh giá phải là số!' })
    @IsNotEmpty({ message: 'Đánh giá không được để trống!' })
    danh_gia: number;

    @ApiProperty({
        default: 500000
    })
    @IsNumber({}, { message: 'Giá tiền phải là số!' })
    @IsNotEmpty({ message: 'Giá tiền không được để trống!' })
    gia_tien: number;

    @ApiProperty({
        default: 1
    })
    @IsNumber({}, { message: 'Người tạo phải là số!' })
    @IsNotEmpty({ message: 'Người tạo không được để trống!' })
    nguoi_tao: number;

    @ApiProperty({
        default: 'https://example.com/image.jpg'
    })
    @IsString({ message: 'Hình ảnh phải là chuỗi!' })
    @IsNotEmpty({ message: 'Hình ảnh không được để trống!' })
    hinh_anh: string;

    @ApiProperty({
        default: 'Thiết kế website bán hàng chuẩn SEO'
    })
    @IsString({ message: 'Mô tả phải là chuỗi!' })
    @IsNotEmpty({ message: 'Mô tả không được để trống!' })
    mo_ta: string;

    @ApiProperty({
        default: 101
    })
    @IsNumber({}, { message: 'Mã chi tiết loại công việc phải là số!' })
    @IsNotEmpty({ message: 'Mã chi tiết loại công việc không được để trống!' })
    ma_chi_tiet_loai: number;

    @ApiProperty({
        default: 'Thiết kế website chuẩn SEO, tốc độ cao'
    })
    @IsString({ message: 'Mô tả ngắn phải là chuỗi!' })
    @IsNotEmpty({ message: 'Mô tả ngắn không được để trống!' })
    mo_ta_ngan: string;

    @ApiProperty({
        default: 4.5
    })
    @IsNumber({}, { message: 'Số sao phải là số!' })
    @IsNotEmpty({ message: 'Số sao không được để trống!' })
    sao_cong_viec: number;
}