import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ACCESS_TOKEN_SECRET } from 'src/common/constant/app.constant';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_SECRET || `ACCESS_TOKEN_SECRET`,
    });
  }

  async validate(decode: any) {
    const user = await this.prismaService.nguoiDung.findUnique({
      where: {
        id: decode.userId,
      },
    });

    if (!user) throw new UnauthorizedException('Not found user');

    return user;
  }
}
