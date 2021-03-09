import { Injectable } from '@nestjs/common';
import { CreateMealDto, GetMealDto, UpdateMealDto } from 'dtos';
import { MealRepository } from 'repositories';

@Injectable()
export class MealService {
  constructor(private readonly mealRepository: MealRepository) {}

  async findAll() {
    const models = await this.mealRepository.getAll();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findAllIncludeComponents() {
    const models = await this.mealRepository.getAllIncludeComponents();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.mealRepository.getById(id);
    const dto = new GetMealDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMealDto) {
    await this.mealRepository.add(createGoalDto);
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    await this.mealRepository.update(id, updateMealDto);
  }

  async remove(id: string) {
    await this.mealRepository.delete(id);
  }
}
