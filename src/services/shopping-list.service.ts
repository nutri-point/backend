import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ShoppingList, User } from '@prisma/client';
import { UnitOfWork } from 'repositories';
import {
  CreateShoppingListDto,
  CreateShoppingListWithItemsDto,
  GetShoppingListDto,
  UpdateShoppingListDto,
  UpdateShoppingListWithItemsDto,
} from 'dtos';

@Injectable()
export class ShoppingListService {
  constructor(
    private readonly uow: UnitOfWork,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll() {
    const user = this.request.user as User;
    if (!user) return [];

    const isAdmin = await this.uow.roleRepository.isAdmin(user);

    let models: ShoppingList[];
    if (isAdmin) {
      models = await this.uow.shoppingListRepository.getAll();
    } else {
      models = await this.uow.shoppingListRepository.getAll(user.id);
    }
    const dtos = models.map((model) => new GetShoppingListDto(model));

    return dtos;
  }

  // TODO: validate if requested object belongs to the user in all services
  async findOne(id: string) {
    const model = await this.uow.shoppingListRepository.getById(id);
    const dto = new GetShoppingListDto(model);

    return dto;
  }

  async findLatest() {
    const user = this.request.user as User;
    if (!user) return null;

    const isAdmin = await this.uow.roleRepository.isAdmin(user);

    let model: ShoppingList;
    if (isAdmin) {
      model = await this.uow.shoppingListRepository.getLatest();
    } else {
      model = await this.uow.shoppingListRepository.getLatest(user.id);
    }
    const dto = new GetShoppingListDto(model);

    return dto;
  }

  async findByUserId(userId: string) {
    const models = await this.uow.shoppingListRepository.getByUserId(userId);
    const dtos = models.map((model) => new GetShoppingListDto(model));

    return dtos;
  }

  async findLatestByUserId(userId: string) {
    const model = await this.uow.shoppingListRepository.getLatestByUserId(
      userId,
    );
    return new GetShoppingListDto(model);
  }

  async create(createShoppingListDto: CreateShoppingListDto) {
    await this.uow.shoppingListRepository.add(createShoppingListDto);
  }

  async createWithItems(
    createShoppingListWithItemsDto: CreateShoppingListWithItemsDto,
  ) {
    await this.uow.shoppingListRepository.addWithItems(
      createShoppingListWithItemsDto,
    );
  }

  async update(id: string, updateShoppingListDto: UpdateShoppingListDto) {
    await this.uow.shoppingListRepository.update(id, {
      items: updateShoppingListDto.items,
    });
  }

  async updateWithItems(
    id: string,
    updateShoppingListWithItemsDto: UpdateShoppingListWithItemsDto,
  ) {
    await this.uow.shoppingListRepository.updateWithItems(id, {
      items: updateShoppingListWithItemsDto.items,
    });
  }

  async remove(id: string) {
    await this.uow.shoppingListRepository.delete(id);
  }
}
