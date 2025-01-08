import { Injectable } from '@nestjs/common';
import { Logs } from './logs.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserService } from 'src/admin-user/admin-user.service';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    private readonly adminUserService: AdminUserService,
  ) {}

  async findUserLogs(id: number) {
    const user = await this.adminUserService.findOne(id);
    return this.logsRepository.find({
      where: { user },
      relations: {
        user: true,
      },
    });
  }
}
