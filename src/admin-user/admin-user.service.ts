import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUser } from './admin-user.entity';
import { Repository } from 'typeorm';
import { Logs } from 'src/logs/logs.entity';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  findAll() {
    return this.adminUserRepository.find()
  }

  find(username: string) {
    return this.adminUserRepository.findOne({where: {username}})
  }

  findOne(id: number) {
    return this.adminUserRepository.findOne({where: {id}})
  }

  create(user: AdminUser) {
    const userTmp = this.adminUserRepository.create(user)

    return this.adminUserRepository.save(userTmp)
  }

  update(id: number, user: Partial<AdminUser>) {
    return this.adminUserRepository.update(id, user)
  }

  remove(id: number) {
    return this.adminUserRepository.delete(id)
  }

  findProfile(id: number) {
    return this.adminUserRepository.findOne({
      where: { id },
      relations: {
        profile: true
      }
    })
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id)
    return this.logsRepository.find({ where: { user }, relations: { 
      user: true
    } })
  }
}
