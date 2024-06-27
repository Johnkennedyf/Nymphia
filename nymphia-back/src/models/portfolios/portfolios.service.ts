import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.client';
import { CreatePortfolioDTO } from './dto/createPortfolio';
import { Portfolio } from '@prisma/client';

@Injectable()
export class PortfoliosService {
	constructor(
		private prisma: PrismaService
	){}

	async create(data: CreatePortfolioDTO): Promise<Portfolio> {
		const findUser = await this.prisma.user.findUnique({
			where: {
				id: data.user_id
			}
		})

		if (!findUser) throw new BadRequestException("User not found");

		return await this.prisma.portfolio.create({
			data: {
        name: data.name,
        description: data.description,
        img: data.img,
        user: {
          connect: {
            id: data.user_id
          }
        }
      }
		});
	}

	async getPortfoliosByUserId(id: string): Promise<Portfolio[]> {
		const findUser = await this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				portfolios: {
					orderBy: {
						created_at: 'desc'
					}
				}
			},
		})

		if (!findUser) throw new NotFoundException("User not found");

		return findUser.portfolios;
	}

	async deletePortfolioById(id: string): Promise<void> {
		const findPortfolio = await this.prisma.portfolio.findUnique({
      where: {
        id
      }
    })

		if (!findPortfolio) throw new NotFoundException("Portfolio not found");

		await this.prisma.portfolio.delete({
      where: {
        id
      }
    })
	}
}
