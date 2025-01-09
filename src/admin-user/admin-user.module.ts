import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin-user.entity';
import { Logs } from 'src/logs/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, Logs])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
