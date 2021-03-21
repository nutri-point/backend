import { User } from '@prisma/client';
import { PrismaService } from 'services';
import { IRepository, UpdateType, UserAddType } from './repository.interface';

export class UserRepository implements IRepository<User, string> {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId?: string) {
    const where = userId ? undefined : { id: userId };
    return this.prisma.user.findMany({ where });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  add(entity: UserAddType<User>) {
    return this.prisma.user.create({
      data: entity,
    });
  }

  update(id: string, entity: UpdateType<User>) {
    return this.prisma.user.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
