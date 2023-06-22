import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { CpfModule } from './cpf/cpf.module';
import { CpfController } from './cpf/cpf.controller';
import { CpfService } from './cpf/cpf.service';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

// const databaseUrl =
//   process.env.DATABASE_URL || 'mongodb://localhost:27017/test';

@Module({
  imports: [
    // MongooseModule.forRoot(databaseUrl),
    ConfigModule.forRoot(),
    CpfModule,HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }, ),
  ],
  controllers: [CpfController],
  providers: [CpfService],
})
export class AppModule {}
