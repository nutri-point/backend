import { Injectable } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { PrismaSelectType } from 'utils/types';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

const select: PrismaSelectType<Goal> = {
  id: true,
  userId: true,
  description: true,
  createdAt: true,
};

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrismaSelectType<Goal>[]> {
    return this.prisma.goal.findMany({ select });
  }

  async findOne(id: string) {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  async findByUserId(userId: string) {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  async create(createGoalDto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: createGoalDto,
    });
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    return this.prisma.goal.update({
      data: updateGoalDto,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.goal.delete({ where: { id } });
  }
}
