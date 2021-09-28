import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { User } from '@prisma/client';

import { UnitOfWork } from 'repositories';
import { GetUserDto, UpdateUserDto } from 'dtos';
import { RoleId } from 'auth/roles/role.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly uow: UnitOfWork,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async me() {
    const user = this.request.user as User;
    if (!user) return null;

    const model = await this.uow.userRepository.getById(user.id);
    const dto = new GetUserDto(model);

    return dto;
  }

  async findAll() {
    const user = this.request.user as User;
    if (!user) return [];

    const isAdmin = await this.uow.roleRepository.isAdmin(user);

    let models: User[];
    if (isAdmin) {
      models = await this.uow.userRepository.getAll();
    } else {
      models = await this.uow.userRepository.getAll(user.id);
    }
    const dtos = models.map((model) => new GetUserDto(model));

    return dtos;
  }

  async findOne(id: string) {
    const model = await this.uow.userRepository.getById(id);
    const dto = new GetUserDto(model);

    return dto;
  }

  async findByEmail(email: string) {
    const model = await this.uow.userRepository.getByEmail(email);
    const dto = new GetUserDto(model);

    return dto;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let memberSince: Date | null = null;
    if (updateUserDto.roleId === RoleId.Member) {
      memberSince = new Date();
    }

    await this.uow.userRepository.update(id, {
      roleId: updateUserDto.roleId,
      memberSince,
    });
  }

  async updateRefreshTokenHash(id: string, refreshTokenHash: string) {
    await this.uow.userRepository.update(id, { refreshTokenHash });
  }

  async remove(id: string) {
    await this.uow.userRepository.delete(id);
  }
}
