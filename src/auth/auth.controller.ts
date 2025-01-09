import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    const { username, password } = signUpDto;

    if (!username || !password) {
      throw new BadRequestException('用户名和密码不能为空');
    }

    return this.authService.signUp(signUpDto);
  }
}
