import { Module } from '@nestjs/common';
import { GoalController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { GoalService, PrismaService } from 'services';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [GoalController],
  providers: [
    GoalService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class GoalModule {}
