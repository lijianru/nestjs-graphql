import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { omit } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const adminUser = await this.adminUserService.find(username);

    if (!adminUser) {
      throw new UnauthorizedException('用户不存在！');
    }

    if (adminUser.password !== password) {
      throw new UnauthorizedException('密码错误！');
    }

    const payload = { username: adminUser.username, sub: adminUser.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUp(signUpDto: SignUpDto) {
    const adminUser = await this.adminUserService.create(signUpDto);
    return adminUser;
  }
}
