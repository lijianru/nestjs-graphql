import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Roles } from './roles.entity';
import { RolesService } from './roles.service';
import { TypeormFilter } from 'src/filters/typeorm-filter.filter';
import { CreateRolesDto } from './dto/create-roles.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('roles')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard, AdminGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() role: CreateRolesDto) {
    return this.rolesService.createRole(role);
  }

  @Get()
  getRoles(): Promise<Roles[]> {
    return this.rolesService.getRoles();
  }

  @Get(':id')
  getRoleById(@Param('id') id: number): Promise<Roles> {
    return this.rolesService.getRoleById(id);
  }

  @Put(':id')
  updateRole(@Param('id') id: number, @Body() role: Roles): Promise<Roles> {
    return this.rolesService.updateRole(id, role);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: number): Promise<void> {
    return this.rolesService.deleteRole(id);
  }
}
