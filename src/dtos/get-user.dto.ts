import { Role, User } from '@prisma/client';
import { UserWithRole } from 'utils/types';

export class GetUserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  role?: Role;

  constructor(model: User & Partial<UserWithRole>) {
    this.id = model.id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.height = model.height;
    this.weight = model.weight;
    this.dateOfBirth = model.dateOfBirth;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.isActive = model.isActive;
    this.role = model.role;
  }
}
