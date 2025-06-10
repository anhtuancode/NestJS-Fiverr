import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBinhLuanDto{
    @ApiProperty({default: "Fill your content here"})
    @IsString({message: 'Content must be a string!'})
    @IsNotEmpty({message: 'Content is required!'})
    noiDung: string

    @ApiProperty({default: "5"})
    @IsNotEmpty({message: 'Rating is required!'})
    saoBinhLuan: number
}