import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async test() {
    const test = await this.prismaService.user.findMany();
    console.log(test)
    return { test };
  }
}
