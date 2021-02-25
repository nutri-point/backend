import { Module } from '@nestjs/common';
import { MealService, PrismaService } from 'services';
import { MealController } from 'controllers';
import { MealRepository } from 'repositories';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService, MealRepository],
})
export class MealModule {}
