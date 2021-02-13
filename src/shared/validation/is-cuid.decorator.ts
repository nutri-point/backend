import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsCUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IS_CUID',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value.startsWith('c') &&
            value.length === 25
          );
        },

        defaultMessage({ value }: ValidationArguments) {
          return `ID ${value} is invalid.`;
        },
      },
    });
  };
}
