import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeModule } from './employe/employe.module';
import { TicketsModule } from './tickets/tickets.module';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [PrismaModule, EmployeModule, TicketsModule, ProblemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
