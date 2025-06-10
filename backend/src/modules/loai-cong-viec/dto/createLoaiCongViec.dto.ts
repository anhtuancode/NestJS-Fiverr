import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoaiCongViecDto{
    @ApiProperty({default: "Lập trình website"})
    @IsString({message: 'ten-loai-cong-viec must be string!'})
    @IsNotEmpty({message: 'ten-loai-cong-viec is required!'})
    ten_loai_cong_viec: string
}