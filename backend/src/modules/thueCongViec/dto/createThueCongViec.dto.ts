import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateThueCongViecDto{
    @ApiProperty({ default: "1" })
    @IsNumber({}, { message: 'Job ID must be a number!' })
    @IsNotEmpty({ message: 'Job ID is required!' })
    ma_cong_viec: number;

    @ApiProperty({ default: 1 })
    @IsNumber({}, { message: 'User ID must be a number!' })
    @IsNotEmpty({ message: 'User ID is required!' })
    ma_nguoi_thue:number

    @ApiProperty({ default: '2025-06-14' })
    @IsDateString({}, { message: 'Date must be a valid ISO string!' })
    @IsNotEmpty({ message: 'Hire date is required!' })
    ngay_thue: string;

    @ApiProperty({ default: true })
    @IsBoolean({ message: 'Completion must be a boolean value!' })
    @IsNotEmpty({ message: 'Completion status is required!' })
    hoan_thanh: boolean;
}