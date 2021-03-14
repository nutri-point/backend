import { Result, User } from '@prisma/client';
import { PrismaService } from 'services';
import { AddType, IRepository, UpdateType } from './repository.interface';
import { RoleRepository } from './role.repository';

export class ResultRepository implements IRepository<Result, string> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async getAll(user?: User) {
    const isAdmin = await this.roleRepository.isAdmin(user);
    const where = isAdmin ? undefined : { userId: user.id };

    return this.prisma.result.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.result.findUnique({ where: { id } });
  }

  getByUserId(userId: string) {
    return this.prisma.result.findMany({ where: { userId } });
  }

  add(entity: AddType<Result>) {
    return this.prisma.result.create({
      data: entity,
    });
  }

  update(id: string, entity: UpdateType<Result>) {
    return this.prisma.result.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: string): Promise<Result> {
    return this.prisma.result.delete({ where: { id } });
  }
}
