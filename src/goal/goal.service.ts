import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Goal, Prisma, User } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { PrismaSelectType } from 'utils/types';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { RoleName } from 'auth/roles/role.enum';

const select: PrismaSelectType<Goal> = {
  id: true,
  userId: true,
  description: true,
  createdAt: true,
};

@Injectable()
export class GoalService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async findAll(): Promise<PrismaSelectType<Goal>[]> {
    const user = this.request.user as User;
    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });

    let where: Prisma.GoalWhereInput | undefined;
    if (role.name !== RoleName.Admin) {
      where = { userId: user.id };
    }

    return this.prisma.goal.findMany({ select, where });
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
