import { Injectable } from '@nestjs/common';
import { CreateMealDto, GetMealDto, UpdateMealDto } from 'dtos';
import { MealRepository } from 'repositories';

@Injectable()
export class MealService {
  constructor(private readonly mealRepositoy: MealRepository) {}

  async findAll() {
    const models = await this.mealRepositoy.getAll();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findAllIncludeComponents() {
    const models = await this.mealRepositoy.getAllIncludeComponents();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.mealRepositoy.getById(id);
    const dto = new GetMealDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMealDto) {
    await this.mealRepositoy.add(createGoalDto);
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    await this.mealRepositoy.update(id, updateMealDto);
  }

  async remove(id: string) {
    await this.mealRepositoy.delete(id);
  }
}
