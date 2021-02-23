import { Role, User } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { IRoleRepository } from 'repositories/interfaces/role.repository';
import { RoleName } from 'auth/roles/role.enum';
import { AddType, UpdateType } from 'repositories/interfaces/repository';

export class RoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  getById(id: number): Promise<Role> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  add(entity: AddType<Role>): Promise<Role> {
    return this.prisma.role.create({
      data: entity,
    });
  }

  update(id: number, entity: UpdateType<Role>): Promise<Role> {
    return this.prisma.role.update({
      data: entity,
      where: { id },
    });
  }

  delete(id: number): Promise<Role> {
    return this.prisma.role.delete({ where: { id } });
  }

  async isAdmin(user: User) {
    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });

    return role.name !== RoleName.Admin;
  }
}
