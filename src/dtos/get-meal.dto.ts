import { Meal } from '@prisma/client';
import { MealWithComponents } from 'utils/types';
import { GetMealComponentDto } from './get-meal-component.dto';

export class GetMealDto {
  id: string;
  name: string;
  recipe?: string;
  components?: GetMealComponentDto[];

  constructor(model: Meal & Partial<MealWithComponents>) {
    this.id = model.id;
    this.name = model.name;
    this.recipe = model.recipe;
    this.components = model.components?.map(
      (component) => new GetMealComponentDto(component),
    );
  }
}
