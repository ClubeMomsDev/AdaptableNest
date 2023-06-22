import { Module } from '@nestjs/common';
import { CpfService } from './cpf.service';
import { CpfController } from './cpf.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })],
  controllers: [CpfController],
  providers: [CpfService],
  exports: [CpfService],
})
export class CpfModule {}
