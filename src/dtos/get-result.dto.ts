import { Result } from '@prisma/client';

export class GetResultDto {
  id: string;
  userId: string;
  date: Date;
  weight: number;
  bodyFatPercent: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(model: Result) {
    this.id = model.id;
    this.userId = model.userId;
    this.date = model.date;
    this.weight = model.weight;
    this.bodyFatPercent = model.bodyFatPercent;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
