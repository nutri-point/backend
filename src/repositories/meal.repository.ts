import { Injectable } from '@nestjs/common';
import { Meal } from '@prisma/client';
import { PrismaService } from 'services';
import { AddType, IRepository, UpdateType } from './repository.interface';

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

  add(entity: AddType<Meal>) {
    return this.prisma.meal.create({
      data: entity,
    });
  }

  update(id: string, entity: UpdateType<Meal>) {
    return this.prisma.meal.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: string) {
    return this.prisma.meal.delete({ where: { id } });
  }
}
