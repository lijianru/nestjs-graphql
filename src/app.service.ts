import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from './enum/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const host = this.configService.get(ConfigEnum.HOST)
    const dbHost = this.configService.get(ConfigEnum.DB_HOST)
    return 'Hello World!' + host + dbHost;
  }
}
