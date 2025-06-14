import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from 'src/common/multer/cloud.result';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const users = await this.prismaService.nguoiDung.findMany({
      where: { isDeleted: false },
    });

    if (!users) throw new BadRequestException('Dont have any user');

    const result = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      gender: user.gender,
      role: user.role,
      birthday: user.birth_day,
      skills: user.skill,
      certification: user.certification,
    }));

    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const {
      name,
      email,
      password,
      phone,
      birthday,
      gender,
      role,
      skill,
      certification,
    } = createUserDto;

    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) throw new BadRequestException('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await this.prismaService.nguoiDung.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
        phone: phone,
        birth_day: birthday,
        gender: gender ? 'male' : 'female',
        role: role,
        skill: JSON.stringify(skill),
        certification: JSON.stringify(certification),
      },
    });

    if (!newUser) throw new BadRequestException('Create user fail');

    return newUser;
  }

  async delete(id: number) {
    const userId = Number(id);

    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExist) throw new BadRequestException('User not found');

    const result = await this.prismaService.nguoiDung.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
      },
    });

    if (!result) throw new BadRequestException('Delete user fail');

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      avatar: result.avatar,
      gender: result.gender,
      role: result.role,
      birthday: result.birth_day,
      skills: result.skill,
      certification: result.certification,
    };
  }

  async search(page: number, pageSize: number, keyword: string) {
    page = Number(page);
    page = page > 0 ? page : 1;
    pageSize = Number(pageSize);
    pageSize = pageSize > 0 ? pageSize : 10;
    keyword = keyword ? keyword.trim() : '';

    const skip = (page - 1) * pageSize;

    const where = { name: { contains: keyword }};

    const result = await this.prismaService.nguoiDung.findMany({
      where: where,
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) throw new BadRequestException('User not found');

    const totalItem = await this.prismaService.nguoiDung.count({
      where: where,
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = result.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      gender: user.gender,
      role: user.role,
      isDeleted: user.isDeleted,
      birthday: user.birth_day,
      skills: user.skill,
      certification: user.certification,
    }));


    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      data: data
    };
  }

  async findOne(id: number) {
    const userId = Number(id);

    const user = await this.prismaService.nguoiDung.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    const userId = Number(id);

    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExist) throw new BadRequestException('User not found');

    const fieldsToUpdate = Object.fromEntries(
      await Promise.all(
        Object.entries(updateUserDto)
          .filter(([_, value]) => value !== undefined)
          .map(async ([key, value]) => {
            if (key === 'gender') {
              return [key, value === true ? 'male' : 'female'];
            }
            if (key === 'skill' || key === 'certification') {
              return [key, Array.isArray(value) ? value.join(',') : value];
            }
            if (key === 'password') {
              const hashedPassword = await bcrypt.hash(value, 10);
              return [key, hashedPassword];
            }
            return [key, value];
          }),
      ),
    );

    const result = await this.prismaService.nguoiDung.update({
      where: {
        id: userId,
      },
      data: fieldsToUpdate,
    });

    if (!result) throw new BadRequestException('Update user fail');

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      phone: result.phone,
      avatar: result.avatar,
      gender: result.gender,
      role: result.role,
      birthday: result.birth_day,
      skills: result.skill,
      certification: result.certification,
    };
  }

  async findAllByName(name: string) {
    const users = await this.prismaService.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (!users) throw new BadRequestException('Dont have any user');

    return users;
  }

  async uploadAvatar(file: Express.Multer.File, user: any) {
    if (!user) throw new BadRequestException('Not found user');
    const userId = Number(user.id);

    if (!file) throw new Error('No file uploaded');

    if (user?.avatar) {
      await cloudinary.uploader.destroy(user.avatar);
    }

    const result = await uploadImage(file.buffer);

    await this.prismaService.nguoiDung.update({
      where: {
        id: userId,
      },
      data: {
        avatar: result.public_id,
      },
    });

    return {
      folder: result.asset_folder,
      filename: file.originalname,
      imgUrl: result.secure_url,
    };
  }
}
