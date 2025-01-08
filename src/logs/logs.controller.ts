import { Controller, Get, Param } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('/:id')
  getUserLogs(@Param('id') id: number) {
    return this.logsService.findUserLogs(id);
  }
}
