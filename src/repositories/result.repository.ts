import { Result } from '@prisma/client';
import { CreateResultDto, UpdateResultDto } from 'dtos';
import { PrismaService } from 'services';
import { IRepository } from './repository.interface';

export class ResultRepository implements IRepository<Result, string> {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId?: string) {
    const where = userId ? undefined : { userId };
    return this.prisma.result.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.result.findUnique({ where: { id } });
  }

  getLatest(userId?: string) {
    const where = userId ? undefined : { userId };

    return this.prisma.result.findFirst({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.result.findMany({ where: { userId } });
  }

  getLatestByUserId(userId: string) {
    return this.prisma.result.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  add(dto: CreateResultDto) {
    return this.prisma.result.create({
      data: dto,
    });
  }

  update(id: string, dto: UpdateResultDto) {
    return this.prisma.result.update({
      data: dto,
      where: { id },
    });
  }

  delete(id: string): Promise<Result> {
    return this.prisma.result.delete({ where: { id } });
  }
}
