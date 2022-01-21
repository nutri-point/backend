import { Role, User } from '@prisma/client';
import { RoleName } from 'auth/roles/role.enum';
import { PrismaService } from 'services';
import { AddType, IRepository, UpdateType } from './repository.interface';

export class RoleRepository implements IRepository<Role, number> {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.role.findMany();
  }

  getById(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  add(entity: AddType<Role>) {
    return this.prisma.role.create({
      data: entity,
    });
  }

  update(id: number, entity: UpdateType<Role>) {
    return this.prisma.role.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }

  async isAdmin(user: User) {
    if (!user) return false;

    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });

    return role.name !== RoleName.Admin;
  }
}
