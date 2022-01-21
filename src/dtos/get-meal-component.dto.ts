import { MealComponent } from '@prisma/client';

export class GetMealComponentDto {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fat: number;

  constructor(model: MealComponent) {
    this.id = model.id;
    this.name = model.name;
    this.calories = model.calories;
    this.proteins = model.proteins;
    this.carbohydrates = model.carbohydrates;
    this.fat = model.fat;
  }
}
