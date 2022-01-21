import { Menu } from '@prisma/client';
import { MenuWithMeals } from 'utils/types';
import { GetMealDto } from './get-meal.dto';

export class GetMenuDto {
  id: string;
  weekStartDate: Date;
  meals?: GetMealDto[];

  constructor(model: Menu & Partial<MenuWithMeals>) {
    this.id = model.id;
    this.weekStartDate = model.weekStartDate;
    this.meals = model.meals?.map((meal) => new GetMealDto(meal));
  }
}
