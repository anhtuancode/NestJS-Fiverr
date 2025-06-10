import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString,} from "class-validator";


export class ForgotPasswordAuthDto {
    @ApiProperty({ default: "abc@gmail.com" })
    @IsEmail({},{ message: 'Email must be a valid email address!' })
    @IsNotEmpty({ message: 'Email is required!' })
    email: string;


    @ApiProperty({ default: "123456" })
    @IsString({ message: 'Password must be a string!' })
    @IsNotEmpty({ message: 'Password is required!' })
    password: string;

    @ApiProperty({ default: "123456" })
    @IsString({ message: 'Confirm Password must be a string!' })
    @IsNotEmpty({ message: 'Confirm Password is required!' })
    confirm_password: string
}