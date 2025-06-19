import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/uploadAvatar.dto';
import { Request } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async delete(@Param('id') id: number, @Req() req: Request) {
    return await this.usersService.delete(id, req.user);
  }

  @Get('phan-trang-tim-kiem')
  @Public()
  @SkipPermission()
  @ApiQuery({ name: 'page', required: false, type: Number})
  @ApiQuery({ name: 'pageSize', required: false, type: Number})
  @ApiQuery({ name: 'keyword', required: false, type: String})
  async search(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ) {
    return await this.usersService.search(page, pageSize, keyword);
  }

  @Get(':id')
  @Public()
  @SkipPermission()
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @SkipPermission()
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return await this.usersService.update(updateUserDto, id, req.user);
  }

  @Get('search/:name')
  @Public()
  @SkipPermission()
  async findByName(@Param('name') name: string) {
    return await this.usersService.findAllByName(name);
  }

  @Post('upload-avatar')
  @SkipPermission()
  @ApiBearerAuth()
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
