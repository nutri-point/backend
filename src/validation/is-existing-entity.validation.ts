import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UnitOfWork } from 'repositories';
import { capitalizeString } from 'utils/helpers';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistingEntityConstraint
  implements ValidatorConstraintInterface {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async validate(entityId: any, validationArguments?: ValidationArguments) {
    console.log('validationArguments', validationArguments);
    const [repoName, keyType] = validationArguments.constraints;

    if (typeof entityId !== keyType) return false;

    const repository = this.unitOfWork.getRepository(repoName);
    const entity = await repository.getById(entityId);

    return !!entity;
  }

  defaultMessage({ value, constraints }: ValidationArguments) {
    const repoName = capitalizeString(constraints[0]);
    return `Entity of type '${repoName}' with ID=${value} does not exist.`;
  }
}

export function IsExistingEntity(
  repoName: string,
  keyType?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [repoName, keyType || 'string'],
      validator: IsExistingEntityConstraint,
    });
  };
}
