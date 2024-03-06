import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsYearRange(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsYearRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          try {
            const n = Number(value);
            return !isNaN(n) && n >= 1900 && n <= new Date().getFullYear();
          } catch (e) {
            return false;
          }
        },
      },
    });
  };
}
