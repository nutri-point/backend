import { Meal, MealComponent } from '@prisma/client';
import { MealWithComponents } from 'utils/types';

export class GetMealDto {
  id: string;
  name: string;
  recipe?: string;
  components?: MealComponent[];

  constructor(model: Meal & Partial<MealWithComponents>) {
    this.id = model.id;
    this.name = model.name;
    this.recipe = model.recipe;
    this.components = model.components;
  }
}
