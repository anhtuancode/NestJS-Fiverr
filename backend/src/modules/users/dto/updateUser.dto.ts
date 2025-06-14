import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: 'Nguyễn Văn A', description: 'User full name' })
  @IsString({ message: 'Name must be string' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'password123', description: 'Password for user' })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: '0987654321', description: 'Phone number' })
  @IsString({ message: 'Phone must be string' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '2000-01-01', description: 'Birthday in YYYY-MM-DD format' })
  @IsString({ message: 'Birthday must be string' }) 
  @IsOptional()
  birth_day?: string;

  @ApiProperty({ example: true, description: 'Gender: true for male, false for female' })
  @IsBoolean({ message: 'Gender must be boolean' })
  @IsOptional()
  gender?: boolean;

  @ApiProperty({ example: 'user', description: 'User role' })
  @IsString({ message: 'Role must be string' })
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: ['css', 'html'],
    description: 'Array of user skills',
    type: [String],
  })
  @IsArray({ message: 'Skill must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each skill must be a string' })
  skill?: string[];

  @ApiProperty({
    example: ['AWS', 'Google'],
    description: 'Array of user certifications',
    type: [String],
  })
  @IsArray({ message: 'Certification must be an array' })
  @IsOptional()
  @IsString({ each: true, message: 'Each certification must be a string' })
  certification?: string[];
}