import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenAuthDto {
    @ApiProperty({ default: "Fill your refresh token here" })
    @IsString({ message: 'Refresh Token must be a string!' })
    @IsNotEmpty({ message: 'Refresh Token is required!' })
    refreshToken: string;

    @ApiProperty({ default: "Fill your access token here" })
    @IsString({ message: 'Access Token must be a string!' })
    @IsNotEmpty({ message: 'Access Token is required!' })
    accessToken: string;
}