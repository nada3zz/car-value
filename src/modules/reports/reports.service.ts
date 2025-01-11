import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared';
import { CreateReportDto, GetEstimateDto } from './dtos';

@Injectable()
export class ReportsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(reportDto: CreateReportDto, userId: number) {
    return await this.prismaService.report.create({
      data: {
        ...reportDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async getEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    const estimate = await this.prismaService.$queryRaw`
    SELECT AVG(price) AS price
    FROM Report
    WHERE make = ${make}
      AND model = ${model}
      AND ABS(lng - ${lng}) <= 50
      AND ABS(lat - ${lat}) <= 50
      AND ABS(year - ${year}) <= 3
      AND approved = TRUE
    ORDER BY ABS(mileage - ${mileage})
    LIMIT 3
  `;
    return estimate;
  }

  async getAll() {
    return await this.prismaService.report.findMany({
      where: { approved: true },
    });
  }

  async getOne(id: number) {
    return await this.prismaService.report.findUnique({ where: { id } });
  }

  async changeApproval(id: number, approved: boolean) {
    return await this.prismaService.report.update({
      where: { id },
      data: { approved },
    });
  }
}
