import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Goal, Prisma, User } from '@prisma/client';
import { RoleName } from 'auth/roles/role.enum';
import { Request } from 'express';
import { PrismaService } from 'shared/prisma.service';
import { PrismaSelectType } from 'utils/types';
import { IGoalRepository } from 'repositories/interfaces/goal.repository';

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
    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });

    let where: Prisma.GoalWhereInput | undefined;
    if (role.name !== RoleName.Admin) {
      where = { userId: user.id };
    }

    return this.prisma.goal.findMany({ select, where });
  }

  getById(id: string): Promise<Goal> {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  getByUserId(userId: string): Promise<Goal[]> {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  add(entity: AddType<Goal>): Promise<Goal> {
    return this.prisma.goal.create({
      data: entity,
    });
  }

  update(id: string, entity: UpdateType<Goal>): Promise<Goal> {
    return this.prisma.goal.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: string): Promise<Goal> {
    return this.prisma.goal.delete({ where: { id } });
  }
}
