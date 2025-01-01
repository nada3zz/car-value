import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

}
