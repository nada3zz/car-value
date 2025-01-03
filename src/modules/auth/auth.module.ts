import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/shared';


@Module({
  imports:[ConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
