import { Role } from '@prisma/client';
import { IRepository } from './repository';

export interface IRoleRepository extends IRepository<Role, number> {}
