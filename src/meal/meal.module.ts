import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { PrismaService } from 'shared/prisma.service';

@Module({
  controllers: [MealController],
  providers: [MealService, PrismaService],
})
export class MealModule {}
