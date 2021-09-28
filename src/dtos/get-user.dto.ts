import { User } from '@prisma/client';

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
  roleId: number;

  constructor(model: User) {
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
    this.roleId = model.roleId;
  }
}
