import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Roles } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [TypeOrmModule.forFeature([Roles])],
})
export class RolesModule {}
