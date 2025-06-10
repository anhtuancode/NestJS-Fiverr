import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ProtectGuard } from './protect/protect.guard';
import { Request } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { ForgotPasswordAuthDto } from './dto/forgotPassword-auth.dto';
import { RefreshTokenAuthDto } from './dto/refreshToken-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signin(@Body() signinAuthDto: SigninAuthDto) {
    return await this.authService.signin(signinAuthDto);
  }

  @Post("signup")
  async signup(@Body() signupDtoAuth: SignupAuthDto){
    return await this.authService.signup(signupDtoAuth);
  }

  @UseGuards(ProtectGuard)
  @Post("logout")
  async logout(@User('id') userId: number){
    console.log(userId);
    return await this.authService.logout(userId);
  }

  @Post("forgot-password")
  async forgotPassword(@Body () forgotPasswordAuthDto: ForgotPasswordAuthDto){
    return await this.authService.forgotPassword(forgotPasswordAuthDto);
  }

  @UseGuards(ProtectGuard)
  @Post("refresh-token")
  async refreshToken(@User('id') userId: number, @Body() refreshTokenAuthDto: RefreshTokenAuthDto){
    return await this.authService.refreshToken(userId, refreshTokenAuthDto);
  } 


}
