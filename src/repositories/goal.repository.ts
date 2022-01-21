import { Goal } from '@prisma/client';
import { CreateGoalDto, UpdateGoalDto } from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

export class GoalRepository implements IRepository<Goal, string> {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId?: string) {
    const where = userId ? undefined : { userId };
    return this.prisma.goal.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.goal.findUnique({ where: { id } });
  }

  getLatest(userId?: string) {
    const where = userId ? undefined : { userId };

    return this.prisma.goal.findFirst({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  getLatestByUserId(userId: string) {
    return this.prisma.goal.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  add(dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateGoalDto) {
    return this.prisma.goal.update({
      data: dto,
      where: { id },
    });
  }

  delete(id: string): Promise<Goal> {
    return this.prisma.goal.delete({ where: { id } });
  }
}
