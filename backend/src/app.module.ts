import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { PrismaService } from './prisma/prisma.service';
import { BinhLuanModule } from './modules/binhLuan/binhLuan.module';
import { CongViecModule } from './modules/congViec/congViec.module';
import { LoaiCongViecModule } from './modules/loaiCongViec/loaiCongViec.module';
import { ChiTietLoaiCongViecModule } from './modules/chiTietLoaiCongViec/chiTietLoaiCongViec.module';
import { UsersModule } from './modules/users/users.module';
import { SkillModule } from './modules/skill/skill.module';
import { ThueCongViecModule } from './modules/thueCongViec/thueCongViec.module';

@Module({
  imports: [AuthModule, TokenModule, BinhLuanModule, CongViecModule, LoaiCongViecModule, ChiTietLoaiCongViecModule, UsersModule, SkillModule, ThueCongViecModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy, PrismaService],
})
export class AppModule {}
