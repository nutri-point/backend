import { ShoppingList, ShoppingListItem } from '@prisma/client';
import { ShoppingListWithItems } from 'utils/types';

export class GetShoppingListDto {
  id: string;
  userId: string;
  items?: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;

  constructor(model: ShoppingList & Partial<ShoppingListWithItems>) {
    this.id = model.id;
    this.userId = model.userId;
    this.items = model.items;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
