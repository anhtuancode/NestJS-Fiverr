import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/uploadAvatar.dto';
import { Request } from 'express';
import { ProtectGuard } from '../auth/protect/protect.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }

  @Get('phan-trang-tim-kiem')
  async search(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('keyword') keyword: string) {
    return await this.usersService.search(page, pageSize, keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number,@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto, id);
  }

  @Get("search/:name")
  async findByName(@Param('name') name: string) {
    return await this.usersService.findAllByName(name);
  }

  @Post("upload-avatar")
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadAvatarDto,
  })
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.usersService.uploadAvatar(file, req.user);
  }
}
