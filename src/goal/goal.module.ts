import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { PrismaService } from 'shared/prisma.service';
import { GoalRepository, RoleRepository } from 'repositories/implementations';

@Module({
  controllers: [GoalController],
  providers: [GoalService, PrismaService, GoalRepository, RoleRepository],
})
export class GoalModule {}
