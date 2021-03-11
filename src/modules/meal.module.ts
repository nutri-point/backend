import { Module } from '@nestjs/common';
import { MealService, PrismaService } from 'services';
import { MealController } from 'controllers';
import { UnitOfWork } from 'repositories';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService, UnitOfWork],
})
export class MealModule {}
