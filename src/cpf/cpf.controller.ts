import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CpfService } from './cpf.service';

@Controller('cpf')
export class CpfController {
  constructor(private readonly cpfService: CpfService) {}

  @Post()
  async serviceCPF(@Body() clientInfo): Promise<string> {
    return await this.cpfService.CPFconsulting(clientInfo);
  }
}
