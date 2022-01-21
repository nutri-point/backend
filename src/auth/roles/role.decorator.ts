import { SetMetadata } from '@nestjs/common';
import { RoleRank } from './role.enum';

export const ROLE_KEY = 'role';
export const Role = (role: RoleRank) => SetMetadata(ROLE_KEY, role);
