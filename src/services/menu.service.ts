import { Injectable } from '@nestjs/common';
import { CreateMenuDto, GetMenuDto, UpdateMenuDto } from 'dtos';
import { UnitOfWork } from 'repositories';

@Injectable()
export class MenuService {
  constructor(private readonly uow: UnitOfWork) {}

  async findAll() {
    const models = await this.uow.menuRepository.getAll();
    const dtos = models.map((model) => new GetMenuDto(model));

    return dtos;
  }

  async findAllIncludeComponents() {
    const models = await this.uow.menuRepository.getAllIncludeComponents();
    const dtos = models.map((model) => new GetMenuDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.menuRepository.getById(id);
    const dto = new GetMenuDto(model);

    return dto;
  }

  async create(createGoalDto: CreateMenuDto) {
    await this.uow.menuRepository.add(createGoalDto);
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    await this.uow.menuRepository.update(id, {
      weekStartDate: updateMenuDto.weekStartDate,
      meals: updateMenuDto.meals,
    });
  }

  async remove(id: string) {
    await this.uow.menuRepository.delete(id);
  }
}
