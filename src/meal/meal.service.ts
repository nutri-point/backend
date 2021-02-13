import { Injectable } from '@nestjs/common';
import { Meal } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { PrismaSelectType } from 'utils/types';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

const select: PrismaSelectType<Meal> = {
  id: true,
  name: true,
  recipe: true,
};

@Injectable()
export class MealService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrismaSelectType<Meal>[]> {
    return this.prisma.meal.findMany({ select });
  }

  async findOne(id: string) {
    return this.prisma.meal.findUnique({ where: { id } });
  }

  async create(createMealDto: CreateMealDto) {
    return this.prisma.meal.create({
      data: createMealDto,
    });
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    return this.prisma.meal.update({
      data: updateMealDto,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.meal.delete({ where: { id } });
  }
}
