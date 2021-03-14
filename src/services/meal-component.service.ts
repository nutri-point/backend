import { Injectable } from '@nestjs/common';
import {
  CreateMealComponentDto,
  GetMealComponentDto,
  UpdateMealComponentDto,
} from 'dtos';
import { UnitOfWork } from 'repositories';

@Injectable()
export class MealComponentService {
  constructor(private readonly uow: UnitOfWork) {}

  async findAll() {
    const models = await this.uow.mealComponentRepository.getAll();
    const dtos = models.map((model) => new GetMealComponentDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.mealComponentRepository.getById(id);
    const dto = new GetMealComponentDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMealComponentDto) {
    await this.uow.mealComponentRepository.add(createGoalDto);
  }

  async update(id: string, updateMealDto: UpdateMealComponentDto) {
    await this.uow.mealComponentRepository.update(id, {
      name: updateMealDto.name,
      calories: updateMealDto.calories,
      proteins: updateMealDto.proteins,
      carbohydrates: updateMealDto.carbohydrates,
      fat: updateMealDto.fat,
    });
  }

  async remove(id: string) {
    await this.uow.mealComponentRepository.delete(id);
  }
}
