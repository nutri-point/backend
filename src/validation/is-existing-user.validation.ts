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
export class IsExistingUserConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(userId: any) {
    if (typeof userId !== 'string') return false;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return !!user;
  }

  defaultMessage({ value }: ValidationArguments) {
    return `User with ID=${value} does not exist.`;
  }
}

export function IsExistingUser(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingUserConstraint,
    });
  };
}
