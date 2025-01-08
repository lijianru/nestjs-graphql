import { AdminUser } from './admin-user.entity';
import { AdminUserService } from './admin-user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetUserDto } from './dto/get-user.dto';

@Controller('admin-user')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  getAdminUsers(@Query() query: GetUserDto) {
    return this.adminUserService.findAll(query);
  }

  @Get('/profile')
  getUserProfile() {
    return this.adminUserService.findProfile(1);
  }

  @Get('/:id')
  getAdminUser(@Param('id') id: number) {
    return this.adminUserService.findOne(id);
  }

  @Post()
  addUser(@Body() user: AdminUser) {
    return this.adminUserService.create(user);
  }

  @Put('/:id')
  updateAdminUser(@Param('id') id: number, @Body() user: AdminUser) {
    return this.adminUserService.update(id, user);
  }

  @Delete('/:id')
  deleteAdminUser(@Param('id') id: number) {
    return this.adminUserService.remove(id);
  }
}
