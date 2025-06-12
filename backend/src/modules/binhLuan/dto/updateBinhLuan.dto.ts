import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBinhLuanDto{
    @ApiProperty({default: "Its look beatiful"})
    @IsString({message: 'Content must be a string!'})
    @IsOptional()
    noi_dung?: string

    @ApiProperty({default: "5"})
    @IsNumber({}, {message: 'Rating must be a number!'})
    @IsOptional()
    sao_binh_luan?: number
}