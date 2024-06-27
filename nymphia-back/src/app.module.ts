import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';
import { PortfoliosModule } from './models/portfolios/portfolios.module';

@Module({
  imports: [UsersModule, PortfoliosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
