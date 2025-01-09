import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from './admin-user.entity';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  findAll(query: GetUserDto) {
    const { page, pageSize, username } = query;
    return this.adminUserRepository.find({
      skip: ((page || 1) - 1) * pageSize,
      take: pageSize || 10,
      relations: {
        profile: true,
        roles: true,
      },
      where: {
        username,
      },
    });
  }

  find(username: string) {
    return this.adminUserRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  findOne(id: number) {
    return this.adminUserRepository.findOne({ where: { id } });
  }

  async create(user: Partial<AdminUser>) {
    const userTmp = this.adminUserRepository.create(user);

    return this.adminUserRepository.save(userTmp);
  }

  update(id: number, user: Partial<AdminUser>) {
    return this.adminUserRepository.update(id, user);
  }

  remove(id: number) {
    return this.adminUserRepository.delete(id);
  }

  findProfile(id: number) {
    return this.adminUserRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }
}
