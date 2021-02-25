import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '@prisma/client';
import { GoalRepository } from 'repositories';
import { GetGoalDto } from 'dtos/get-goal.dto';
import { CreateGoalDto } from 'dtos/create-goal.dto';
import { UpdateGoalDto } from 'dtos/update-goal.dto';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll() {
    const user = this.request.user as User;
    const models = await this.goalRepository.getAll(user);
    const dtos = models.map((model) => new GetGoalDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.goalRepository.getById(id);
    const dto = new GetGoalDto(model);

    return dto;
  }

  async findByUserId(userId: string) {
    const models = await this.goalRepository.getByUserId(userId);
    const dtos = models.map((model) => new GetGoalDto(model));

    return dtos;
  }

  async create(createGoalDto: CreateGoalDto) {
    await this.goalRepository.add(createGoalDto);
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    await this.goalRepository.update(id, updateGoalDto);
  }

  async remove(id: string) {
    await this.goalRepository.delete(id);
  }
}
