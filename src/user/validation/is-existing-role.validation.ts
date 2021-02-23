import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'services';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistingRoleConstraint implements ValidatorConstraintInterface {
  // constructor(private readonly prisma: PrismaService) {}

  async validate(roleId: any) {
    if (typeof roleId !== 'number') return false;

    // const role = await this.prisma.role.findUnique({ where: { id: roleId } });

    return !!true;
  }

  defaultMessage({ value }: ValidationArguments) {
    return `Role with ID=${value} does not exist.`;
  }
}

export function IsExistingRole(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingRoleConstraint,
    });
  };
}
