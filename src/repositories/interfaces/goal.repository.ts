import { Goal } from '@prisma/client';
import { IRepository } from './repository';

export interface IGoalRepository extends IRepository<Goal, string> {
  getByUserId(userId: string): Promise<Goal[]>;
}
