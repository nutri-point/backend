import { Goal } from '@prisma/client';

export interface IGoalRepository extends IRepository<Goal, string> {
  getByUserId(userId: string): Promise<Goal[]>;
}
