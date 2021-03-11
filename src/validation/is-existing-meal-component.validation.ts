import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'services';

// TODO: Write generic IsExistingEntity validator
@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistingMealComponentConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(mealComponentId: any) {
    if (typeof mealComponentId !== 'string') return false;

    const mealComponent = await this.prisma.mealComponent.findUnique({
      where: { id: mealComponentId },
    });

    return !!mealComponent;
  }

  defaultMessage({ value }: ValidationArguments) {
    return `Meal component with ID=${value} does not exist.`;
  }
}

export function IsExistingMealComponent(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingMealComponentConstraint,
    });
  };
}