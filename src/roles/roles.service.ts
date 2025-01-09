import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { CreateRolesDto } from './dto/create-roles.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly roleRepository: Repository<Roles>) {}

  createRole(role: CreateRolesDto) {
    const roleTmp = this.roleRepository.create(role);

    return this.roleRepository.save(roleTmp);
  }

  async getRoles(): Promise<Roles[]> {
    return await this.roleRepository.find();
  }

  async getRoleById(id: number): Promise<Roles> {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async updateRole(id: number, role: Roles): Promise<Roles> {
    await this.roleRepository.update(id, role);
    return await this.roleRepository.findOne({ where: { id } });
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
