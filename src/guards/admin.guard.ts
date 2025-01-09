import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminUserService } from 'src/admin-user/admin-user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly adminUserService: AdminUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminUser = await this.adminUserService.find(request.user.username);

    if (!adminUser) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (adminUser.roles.some((role) => role.name === 'admin')) {
      return true;
    }

    return false;
  }
}
