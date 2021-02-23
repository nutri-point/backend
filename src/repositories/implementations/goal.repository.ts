import { Goal, User } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { IGoalRepository } from 'repositories/interfaces/goal.repository';
import { RoleRepository } from './role.repository';
import { AddType, UpdateType } from 'repositories/interfaces/repository';

export class GoalRepository implements IGoalRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async getAll(user?: User): Promise<Goal[]> {
    const isAdmin = await this.roleRepository.isAdmin(user);
    const where = user && isAdmin ? { userId: user.id } : undefined;

    return this.prisma.goal.findMany({ where });
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
