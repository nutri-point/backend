import { Module } from '@nestjs/common';
import { GoalController } from 'controllers';
import { GoalRepository, RoleRepository } from 'repositories';
import { GoalService, PrismaService } from 'services';
import { IsExistingUserConstraint } from 'validation';

@Module({
  controllers: [GoalController],
  providers: [
    GoalService,
    PrismaService,
    RoleRepository,
    GoalRepository,
    IsExistingUserConstraint,
  ],
})
export class GoalModule {}
