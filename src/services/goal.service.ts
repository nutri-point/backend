import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '@prisma/client';
import { UnitOfWork } from 'repositories';
import { CreateGoalDto, GetGoalDto, UpdateGoalDto } from 'dtos';

@Injectable()
export class GoalService {
  constructor(
    private readonly uow: UnitOfWork,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll() {
    const user = this.request.user as User;
    const models = await this.uow.goalRepository.getAll(user);
    const dtos = models.map((model) => new GetGoalDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.goalRepository.getById(id);
    const dto = new GetGoalDto(model);

    return dto;
  }

  async findByUserId(userId: string) {
    const models = await this.uow.goalRepository.getByUserId(userId);
    const dtos = models.map((model) => new GetGoalDto(model));

    return dtos;
  }

  async create(createGoalDto: CreateGoalDto) {
    await this.uow.goalRepository.add(createGoalDto);
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    await this.uow.goalRepository.update(id, {
      description: updateGoalDto.description,
    });
  }

  async remove(id: string) {
    await this.uow.goalRepository.delete(id);
  }
}
