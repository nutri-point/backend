import { ShoppingList } from '@prisma/client';
import {
  CreateShoppingListDto,
  CreateShoppingListWithItemsDto,
  UpdateShoppingListDto,
  UpdateShoppingListWithItemsDto,
} from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

export class ShoppingListRepository
  implements IRepository<ShoppingList, string> {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId?: string) {
    const where = userId ? undefined : { userId };
    return this.prisma.shoppingList.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.shoppingList.findUnique({ where: { id } });
  }

  getLatest(userId?: string) {
    const where = userId ? undefined : { userId };

    return this.prisma.shoppingList.findFirst({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.shoppingList.findMany({ where: { userId } });
  }

  getLatestByUserId(userId: string) {
    return this.prisma.shoppingList.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  add(dto: CreateShoppingListDto) {
    const itemsToConnect = dto.items.map((itemId) => ({
      id: itemId,
    }));

    return this.prisma.shoppingList.create({
      data: {
        user: { connect: { id: dto.userId } },
        items: { connect: itemsToConnect },
      },
    });
  }

  addWithItems(dto: CreateShoppingListWithItemsDto) {
    const itemsToCreate = dto.items.map((itemDto) => ({
      name: itemDto.name,
    }));

    return this.prisma.shoppingList.create({
      data: {
        user: { connect: { id: dto.userId } },
        items: { create: itemsToCreate },
      },
    });
  }

  update(id: string, dto: UpdateShoppingListDto) {
    const itemsToConnect = dto.items.map((itemId) => ({
      id: itemId,
    }));

    return this.prisma.shoppingList.update({
      data: {
        items: { connect: itemsToConnect },
      },
      where: { id },
    });
  }

  updateWithItems(id: string, dto: UpdateShoppingListWithItemsDto) {
    const itemsToCreate = dto.items.map((itemDto) => ({
      name: itemDto.name,
    }));

    return this.prisma.shoppingList.update({
      data: {
        items: { deleteMany: {}, create: itemsToCreate },
      },
      where: { id },
    });
  }

  delete(id: string): Promise<ShoppingList> {
    return this.prisma.shoppingList.delete({ where: { id } });
  }
}
