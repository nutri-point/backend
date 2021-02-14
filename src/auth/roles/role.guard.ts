import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { RoleRank } from './role.enum';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoleRank = this.reflector.getAllAndOverride<RoleRank>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoleRank) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (user && user.roleId && this.hasRoleRank(user, requiredRoleRank)) {
      return true;
    }

    throw new UnauthorizedException(
      'You do not have permission to perform this action.',
    );
  }

  private async hasRoleRank(user: User, requiredRank: number) {
    const role = await this.prisma.role.findUnique({
      where: { id: user.roleId },
    });
    return role.rank >= requiredRank;
  }
}
