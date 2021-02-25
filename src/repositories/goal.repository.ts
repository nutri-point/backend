import { Injectable } from '@nestjs/common';
import { Goal, User } from '@prisma/client';
import { PrismaService } from 'services';
import { AddType, IRepository, UpdateType } from './repository.interface';
import { RoleRepository } from './role.repository';

@Injectable()
export class GoalRepository implements IRepository<Goal, string> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async getAll(user?: User) {
    const isAdmin = await this.roleRepository.isAdmin(user);
    const where = user && isAdmin ? { userId: user.id } : undefined;

    return this.prisma.goal.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  getByUserId(userId: string) {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  add(entity: AddType<Goal>) {
    return this.prisma.goal.create({
      data: entity,
    });
  }

  update(id: string, entity: UpdateType<Goal>) {
    return this.prisma.goal.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: string): Promise<Goal> {
    return this.prisma.goal.delete({ where: { id } });
  }
}
