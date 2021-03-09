import { Injectable } from '@nestjs/common';
import { MealComponent } from '@prisma/client';
import { CreateMealComponentDto, UpdateMealComponentDto } from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

@Injectable()
export class MealComponentRepository
  implements IRepository<MealComponent, string> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.mealComponent.findMany();
  }

  getById(id: string) {
    return this.prisma.mealComponent.findUnique({
      where: { id },
    });
  }

  add(dto: CreateMealComponentDto) {
    return this.prisma.mealComponent.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateMealComponentDto) {
    return this.prisma.mealComponent.update({
      data: dto,
      where: { id },
    });
  }

  delete(id: string) {
    return this.prisma.mealComponent.delete({ where: { id } });
  }
}
