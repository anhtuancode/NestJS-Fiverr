import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { User } from 'src/common/decorator/user.decorator';
import { ForgotPasswordAuthDto } from './dto/forgotPassword-auth.dto';
import { RefreshTokenAuthDto } from './dto/refreshToken-auth.dto';
import { ProtectGuard } from './protect/protect.guard';
import { Public } from 'src/common/decorator/public.decorator';
import { SkipPermission } from 'src/common/decorator/skip-permission.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @SkipPermission()
  @Post("signin")
  async signin(@Body() signinAuthDto: SigninAuthDto) {
    return await this.authService.signin(signinAuthDto);
  }

  @Public()
  @SkipPermission()
  @Post("signup")
  async signup(@Body() signupDtoAuth: SignupAuthDto){
    return await this.authService.signup(signupDtoAuth);
  }


  @Post("logout")
  async logout(@User('id') userId: number){
    return await this.authService.logout(userId);
  }

  @Public()
  @SkipPermission()
  @Post("forgot-password")
  async forgotPassword(@Body () forgotPasswordAuthDto: ForgotPasswordAuthDto){
    return await this.authService.forgotPassword(forgotPasswordAuthDto);
  }

  @Public()
  @SkipPermission()
  @Post("refresh-token")
  async refreshToken(@User('id') userId: number, @Body() refreshTokenAuthDto: RefreshTokenAuthDto){
    return await this.authService.refreshToken(userId, refreshTokenAuthDto);
  } 


}
