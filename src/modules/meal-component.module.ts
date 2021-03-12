import { Module } from '@nestjs/common';
import { MealComponentService, PrismaService } from 'services';
import { MealComponentController } from 'controllers';
import { UnitOfWork } from 'repositories';
import { IsExistingEntityConstraint } from 'validation';

@Module({
  controllers: [MealComponentController],
  providers: [
    MealComponentService,
    PrismaService,
    UnitOfWork,
    IsExistingEntityConstraint,
  ],
})
export class MealComponentModule {}
