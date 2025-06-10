import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignupAuthDto{
    @ApiProperty({ default: "Nguyen Anh Tuan" })
    @IsString({ message: 'Name must be a string!' })
    @IsNotEmpty({ message: 'Name is required!' })
    name: string;

    @ApiProperty({ default: "abc@gmail.com" })
    @IsString({ message: 'Email must be a valid email address!' })
    @IsNotEmpty({ message: 'Email is required!' })
    email: string;

    @ApiProperty({ default: "123456" })
    @IsString({ message: 'Password must be a string!' })
    @IsNotEmpty({ message: 'Password is required!' })
    password: string;

    @ApiProperty({ default: "123456" })
    @IsString({ message: 'Confirm Password must be a string!' })
    @IsNotEmpty({ message: 'Confirm Password is required!' })
    confirm_password: string;
}