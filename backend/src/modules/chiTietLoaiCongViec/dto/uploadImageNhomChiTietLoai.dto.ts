import { ApiProperty } from "@nestjs/swagger";

export class UploadImageNhomDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    avatar: any;
}