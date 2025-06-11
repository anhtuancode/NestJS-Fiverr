import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { ForgotPasswordAuthDto } from './dto/forgotPassword-auth.dto';
import { RefreshTokenAuthDto } from './dto/refreshToken-auth.dto';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';
import { JwtService } from '@nestjs/jwt';
import { Public } from 'src/common/decorator/public.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinAuthDto: SigninAuthDto) {
    const { email, password } = signinAuthDto;

    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: { email },
    });

    if (!userExist)
      throw new BadRequestException(
        "Email doesn't exist. please register first and login again",
      );

    if (!userExist?.password)
      throw new BadRequestException('Please login with google or facebook');

    const isPassword = await bcrypt.compare(password, userExist.password);

    if (!isPassword)
      throw new BadRequestException(
        'Password or Email is wrong, please check again',
      );

    const userToken = this.tokenService.createToken(userExist.id);

    return userToken;
  }


  async signup(signupDtoAuth: SignupAuthDto) {
    const { name, email, password, confirm_password } = signupDtoAuth;

    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist)
      throw new BadRequestException('Email is exist please choose another one');

    if (password != confirm_password)
      throw new BadRequestException(
        'Password and Confirm Password dont match, please fill again',
      );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    console.log(hashPassword);

    const newUser = await this.prismaService.nguoiDung.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    const { password: _, ...result } = newUser;
    return result;
  }

  async logout(userId: number) {
    return { message: 'Logout successfully' };
  }

  async forgotPassword(forgotPasswordAuthDto: ForgotPasswordAuthDto) {
    const { email, password, confirm_password } = forgotPasswordAuthDto;
    const userExist = await this.prismaService.nguoiDung.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExist) throw new BadRequestException('Email is not exist');

    if (password != confirm_password)
      throw new BadRequestException(
        'Password and Confirm Password dont match, please fill again',
      );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const updateUser = await this.prismaService.nguoiDung.update({
      where: {
        email: email,
      },
      data: {
        password: hashPassword,
      },
    });

    return updateUser;
  }

  async refreshToken(userId: number, refreshTokenAuthDto: RefreshTokenAuthDto) {
    const { accessToken, refreshToken } = refreshTokenAuthDto;

    if (!accessToken) throw new UnauthorizedException('Dont have accessToken');
    if (!refreshToken)
      throw new UnauthorizedException('Dont have refreshToken');

    const decodeRefreshToken = this.jwtService.verify(refreshToken, {
      secret: REFRESH_TOKEN_SECRET
    });
    const decodeAccessToken = this.jwtService.verify(accessToken, {
      secret: ACCESS_TOKEN_SECRET,
      ignoreExpiration: true,
    });


    if (decodeAccessToken.userId !== decodeRefreshToken.userId)
      throw new UnauthorizedException("Token isnt suitable");

    const tokens = this.tokenService.createToken(decodeRefreshToken.userId);

    return tokens;
  }
}
