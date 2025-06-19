import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionStrategy extends PassportStrategy(
  Strategy,
  'permission',
) {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async validate(req: any) {
    const user = req.user;
    const role = user.role;

    if (!user) {
      throw new UnauthorizedException('Không xác định được người dùng');
    }

    if (!role || role.trim() === '' || role === 'user') {
      throw new ForbiddenException('Bạn không có quyền admin truy cập');
    }

    if (role === 'admin') {
      return true;
    }

    // 1 - endpoint người dùng gọi
    const endpoint = req?._parsedUrl?.pathname;
    const method = req?.method;

    const isPermission = await this.prismaService.nguoiDung.findFirst({
      where: {
        role: role,
      },
    });

    if (isPermission === null) {
      throw new BadRequestException(`Không có quyện truy cập với endpoint này`);
    }

    return true;
  }
}
