import { Prisma } from '@prisma/client';

export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

export type PrismaSelectType<Type> = Partial<OptionsFlags<Type>>;

export type MealWithComponents = Prisma.MealGetPayload<{
  include: { components: true };
}>;
