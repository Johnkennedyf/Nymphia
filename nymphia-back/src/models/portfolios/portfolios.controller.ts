import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDTO } from './dto/createPortfolio';
import { Portfolio } from '@prisma/client';

@Controller('portfolios')
export class PortfoliosController {
	constructor(
		private portfoliosService: PortfoliosService
	) {}

	@Post('')
	async createPortfolio(@Body() data: CreatePortfolioDTO): Promise<Portfolio> {
		return await this.portfoliosService.create(data);
	}

	@Get(':id')
	async findByUserId(@Param("id") id: string): Promise<Portfolio[]> {
		return await this.portfoliosService.getPortfoliosByUserId(id);
	}

	@Delete(':id')
	async deletePortfolioById(@Param("id") id: string): Promise<void> {
		return await this.portfoliosService.deletePortfolioById(id);
	}
}
