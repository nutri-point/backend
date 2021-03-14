import { Injectable } from '@nestjs/common';
import { CreateMealDto, GetMealDto, UpdateMealDto } from 'dtos';
import { UnitOfWork } from 'repositories';

@Injectable()
export class MealService {
  constructor(private readonly uow: UnitOfWork) {}

  async findAll() {
    const models = await this.uow.mealRepository.getAll();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findAllIncludeComponents() {
    const models = await this.uow.mealRepository.getAllIncludeComponents();
    const dtos = models.map((model) => new GetMealDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.mealRepository.getById(id);
    const dto = new GetMealDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMealDto) {
    await this.uow.mealRepository.add(createGoalDto);
  }

  async update(id: string, updateMealDto: UpdateMealDto) {
    await this.uow.mealRepository.update(id, {
      name: updateMealDto.name,
      recipe: updateMealDto.recipe,
      components: updateMealDto.components,
    });
  }

  async remove(id: string) {
    await this.uow.mealRepository.delete(id);
  }
}
