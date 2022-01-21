import { Menu } from '@prisma/client';
import { CreateMenuDto, UpdateMenuDto } from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

export class MenuRepository implements IRepository<Menu, string> {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.menu.findMany();
  }

  getAllIncludeComponents() {
    return this.prisma.menu.findMany({ include: { meals: true } });
  }

  getById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
      include: { meals: true },
    });
  }

  add(dto: CreateMenuDto) {
    const mealsToConnect = dto.meals.map((mealId) => ({
      id: mealId,
    }));

    return this.prisma.menu.create({
      data: {
        weekStartDate: dto.weekStartDate,
        meals: { connect: mealsToConnect },
      },
    });
  }

  // TODO: check if meals are updated
  update(id: string, dto: UpdateMenuDto) {
    const mealsToConnect = dto.meals.map((mealId) => ({
      id: mealId,
    }));

    return this.prisma.menu.update({
      data: {
        weekStartDate: dto.weekStartDate,
        meals: { connect: mealsToConnect },
      },
      where: { id },
    });
  }

  delete(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }
}
