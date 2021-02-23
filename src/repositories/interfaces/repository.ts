import { User } from '@prisma/client';

export type AddType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateType<T> = Partial<AddType<T>>;

export interface IRepository<TEntity, TKey> {
  getAll(user?: User): Promise<Partial<TEntity>[]>;
  getById(id: TKey): Promise<TEntity>;
  add(entity: AddType<TEntity>): Promise<TEntity>;
  update(id: TKey, entity: UpdateType<TEntity>): Promise<TEntity>;
  delete(id: TKey): Promise<TEntity>;
}
