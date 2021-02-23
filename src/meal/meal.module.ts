import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService } from 'services';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService],
})
export class MealModule {}
