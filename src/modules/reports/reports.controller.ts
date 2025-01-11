import { Controller, Get, Query, Post, Body, Patch, UseGuards, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ApproveReportDto, CreateReportDto, GetEstimateDto } from './dtos';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('reports')
export class ReportsController {
    constructor( private reportsService: ReportsService){}

    @Get('/estimate')
    async getEstimate(@Query() query: GetEstimateDto) {
      return await this.reportsService.getEstimate(query);
    }
  
    @Post()
    @UseGuards(AuthGuard)
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
      return await this.reportsService.create(body, user.id);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getAllReports() {
      return await this.reportsService.getAll();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getReport(@Param('id') id: string) {
      return await this.reportsService.getOne(parseInt(id));
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    async approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
      return await this.reportsService.changeApproval(parseInt(id), body.approved);
    }

}
