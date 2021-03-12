import { Module } from '@nestjs/common';
import { MealService, PrismaService } from 'services';
import { MealController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [MealController],
  providers: [
    MealService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class MealModule {}
