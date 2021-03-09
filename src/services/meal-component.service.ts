import { Injectable } from '@nestjs/common';
import {
  CreateMealComponentDto,
  GetMealComponentDto,
  UpdateMealComponentDto,
} from 'dtos';
import { MealComponentRepository } from 'repositories';

@Injectable()
export class MealComponentService {
  constructor(
    private readonly mealComponentRepository: MealComponentRepository,
  ) {}

  async findAll() {
    const models = await this.mealComponentRepository.getAll();
    const dtos = models.map((model) => new GetMealComponentDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.mealComponentRepository.getById(id);
    const dto = new GetMealComponentDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMealComponentDto) {
    await this.mealComponentRepository.add(createGoalDto);
  }

  async update(id: string, updateMealDto: UpdateMealComponentDto) {
    await this.mealComponentRepository.update(id, updateMealDto);
  }

  async remove(id: string) {
    await this.mealComponentRepository.delete(id);
  }
}
