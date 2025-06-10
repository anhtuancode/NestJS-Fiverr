import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';
import { PrismaService } from './prisma/prisma.service';
import { BinhLuanModule } from './modules/binh-luan/binh-luan.module';
import { CongViecModule } from './modules/cong-viec/cong-viec.module';
import { LoaiCongViecModule } from './modules/loai-cong-viec/loai-cong-viec.module';

@Module({
  imports: [AuthModule, TokenModule, BinhLuanModule, CongViecModule, LoaiCongViecModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy, PrismaService],
})
export class AppModule {}
