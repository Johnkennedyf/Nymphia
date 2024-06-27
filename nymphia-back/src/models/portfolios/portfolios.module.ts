import { Module } from '@nestjs/common';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import { PrismaService } from 'src/database/prisma.client';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService, PrismaService],
  imports: [],
})
export class PortfoliosModule {}
