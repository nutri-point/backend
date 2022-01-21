import { Goal } from '@prisma/client';

export class GetGoalDto {
  id: string;
  userId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(model: Goal) {
    this.id = model.id;
    this.userId = model.userId;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
