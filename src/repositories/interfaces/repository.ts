type AddType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

type UpdateType<T> = Partial<AddType<T>>;

interface IRepository<TEntity, TKey> {
  getAll(): Promise<Partial<TEntity>[]>;
  getById(id: TKey): Promise<TEntity>;
  add(entity: AddType<TEntity>): Promise<TEntity>;
  update(id: TKey, entity: UpdateType<TEntity>): Promise<TEntity>;
  delete(id: TKey): Promise<TEntity>;
}
