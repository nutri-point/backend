import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'services';
import { PrismaSelectType } from 'utils/types';

import { UpdateUserDto } from './dto/update-user.dto';

const select: PrismaSelectType<User> = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrismaSelectType<User>[]> {
    return this.prisma.user.findMany({ select });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async updateRefreshTokenHash(id: string, refreshTokenHash: string) {
    return this.prisma.user.update({
      data: { refreshTokenHash },
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
