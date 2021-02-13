export type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

export type PrismaSelectType<Type> = Partial<OptionsFlags<Type>>;
