import { AdminUser } from './admin-user.entity';
import { AdminUserService } from './admin-user.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  getAdminUsers() {
    return this.adminUserService.findAll()
  }

  @Post()
  addUser() {
    const user: AdminUser = {
      username:'richard',
      password: '111111'
    } as AdminUser
    return this.adminUserService.create(user)
  }

  @Get('/profile')
  getUserProfile() {
    return this.adminUserService.findProfile(1)
  }

  @Get('/logs')
  getUserLogs() {
    return this.adminUserService.findUserLogs(1)
  }
}
