import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Goal } from '@prisma/client';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalRepository } from 'repositories/implementations/goal.repository';

@Injectable()
export class GoalService {
  constructor(
    private readonly goalRepository: GoalRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll(): Promise<Partial<Goal>[]> {
    return this.goalRepository.getAll();
  }

  async findOne(id: string) {
    return this.goalRepository.getById(id);
  }

  async findByUserId(userId: string) {
    return this.goalRepository.getByUserId(userId);
  }

  async create(createGoalDto: CreateGoalDto) {
    return this.goalRepository.add(createGoalDto);
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    return this.goalRepository.update(id, updateGoalDto);
  }

  async remove(id: string) {
    return this.goalRepository.delete(id);
  }
}
