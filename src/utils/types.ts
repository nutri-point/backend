import { Prisma } from '@prisma/client';

export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PrismaSelectType<Type> = Partial<OptionsFlags<Type>>;

export type MealWithComponents = Prisma.MealGetPayload<{
  include: { components: true };
}>;

export type UserWithRole = Prisma.UserGetPayload<{
  include: { role: true };
}>;

export type MenuWithMeals = Prisma.MenuGetPayload<{
  include: { meals: true };
}>;

export type ShoppingListWithItems = Prisma.ShoppingListGetPayload<{
  include: { items: true };
}>;
