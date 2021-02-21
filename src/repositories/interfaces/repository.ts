interface IRepository<TEntity, TKey> {
  getAll(): Promise<Partial<TEntity>[]>;
  getById(id: TKey): Promise<TEntity>;
  add(entity: EntityAdd<TEntity>): Promise<TEntity>;
  update(id: TKey, entity: EntityUpdate<TEntity>): Promise<TEntity>;
  delete(id: TKey): Promise<TEntity>;
}

type EntityAdd<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

type EntityUpdate<T> = Partial<EntityAdd<T>>;
