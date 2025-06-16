import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsOptional } from "class-validator";

export class UpdateThueCongViecDto{
    @ApiProperty({ default: "1" })
    @IsNumber({}, { message: 'Job ID must be a number!' })
    @IsOptional()
    ma_cong_viec?: number;

    @ApiProperty({ default: 1 })
    @IsNumber({}, { message: 'User ID must be a number!' })
    @IsOptional()
    ma_nguoi_thue?:number

    @ApiProperty({ default: '2025-06-14' })
    @IsDateString({}, { message: 'Date must be a valid ISO string!' })
    @IsOptional()
    ngay_thue?: string;

    @ApiProperty({ default: true })
    @IsBoolean({ message: 'Completion must be a boolean value!' })
    @IsOptional()
    hoan_thanh?: boolean;
}