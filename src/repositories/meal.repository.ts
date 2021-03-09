import { Injectable } from '@nestjs/common';
import { Meal } from '@prisma/client';
import { CreateMealDto, UpdateMealDto } from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

@Injectable()
export class MealRepository implements IRepository<Meal, string> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.meal.findMany();
  }

  async getAllIncludeComponents() {
    return this.prisma.meal.findMany({ include: { components: true } });
  }

  getById(id: string) {
    return this.prisma.meal.findUnique({
      where: { id },
      include: { components: true },
    });
  }

  add(dto: CreateMealDto) {
    return this.prisma.meal.create({
      data: dto,
    });
  }

  // TODO: check if meal components are updated
  update(id: string, dto: UpdateMealDto) {
    const componentsToConnect = dto.components.map((mealComponentId) => ({
      id: mealComponentId,
    }));

    return this.prisma.meal.update({
      data: {
        name: dto.name,
        recipe: dto.recipe,
        components: { connect: componentsToConnect },
      },
      where: { id },
    });
  }

  delete(id: string) {
    return this.prisma.meal.delete({ where: { id } });
  }
}
