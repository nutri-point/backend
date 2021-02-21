import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Goal, User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'shared/prisma.service';
import { PrismaSelectType } from 'utils/types';
import { IGoalRepository } from 'repositories/interfaces/goal.repository';
import { getWhereFilterForUser } from 'utils/repository.utils';

const select: PrismaSelectType<Goal> = {
  id: true,
  userId: true,
  description: true,
  createdAt: true,
};

export class GoalRepository implements IGoalRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async getAll(): Promise<Partial<Goal>[]> {
    const user = this.request.user as User;
    const where = await getWhereFilterForUser(user, this.prisma);

    return this.prisma.goal.findMany({ select, where });
  }

  // TODO: Check if User has access to requested Goal
  getById(id: string): Promise<Goal> {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  // TODO: Check if User has access to requested Goals
  getByUserId(userId: string): Promise<Goal[]> {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  // TODO: Check access
  add(entity: AddType<Goal>): Promise<Goal> {
    return this.prisma.goal.create({
      data: entity,
    });
  }

  // TODO: Check access
  update(id: string, entity: UpdateType<Goal>): Promise<Goal> {
    return this.prisma.goal.update({
      data: entity,
      where: { id },
    });
  }

  // TODO: Check access
  delete(id: string): Promise<Goal> {
    return this.prisma.goal.delete({ where: { id } });
  }
}
