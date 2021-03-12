import { Meal, Menu } from '@prisma/client';
import { MenuWithMeals } from 'utils/types';

export class GetMenuDto {
  id: string;
  weekStartDate: Date;
  meals?: Meal[];

  constructor(model: Menu & Partial<MenuWithMeals>) {
    this.id = model.id;
    this.weekStartDate = model.weekStartDate;
    this.meals = model.meals;
  }
}
