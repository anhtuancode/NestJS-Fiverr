import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBinhLuanDto{
    @ApiProperty({ default: "1" })
    @IsNumber({}, { message: 'Job ID must be a number!' })
    @IsNotEmpty({ message: 'Job ID is required!' })
    maCongViec: number;

    @ApiProperty({default: "Its look beatiful"})
    @IsString({message: 'Content must be a string!'})
    @IsNotEmpty({message: 'Content is required!'})
    noiDung: string

    @ApiProperty({default: "5"})
    @IsNumber({}, {message: 'Rating must be a number!'})
    @IsNotEmpty({message: 'Rating is required!'})
    saoBinhLuan: number
}