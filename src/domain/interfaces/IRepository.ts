/**
 * E: Entity
 * C: Create
 * U: Update
 */
export interface IRepositoryAsync<E, C, U> {
  findAll(filter?: string): Promise<E[]>;
  findById(id: number): Promise<E>;
  save(entity: C): Promise<E>;
  update(id: number, entity: U): Promise<E>;
  delete(id: number): Promise<void>;
}

/**
 * E: Entity
 * C: Create
 * U: Update
 */
export interface IDAOAsync<E, C, U> {
  findAll(): Promise<E[]>;
  findById(id: number): Promise<E>;
  create(entity: C): Promise<E>;
  update(id: number, entity: U): Promise<E>;
  delete(id: number): Promise<void>;
}
