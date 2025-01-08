import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './logs.entity';
import { AdminUserService } from 'src/admin-user/admin-user.service';
import { AdminUser } from 'src/admin-user/admin-user.entity';

@Module({
  controllers: [LogsController],
  providers: [LogsService, AdminUserService],
  imports: [TypeOrmModule.forFeature([Logs, AdminUser])],
})
export class LogsModule {}
