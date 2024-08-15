/**
 * E: Entity
 * C: Create
 * U: Update
 */
export interface IRepositoryAsync<E, C, U> {
    findAll(): Promise<E[] | null>;
    findById(id: number): Promise<E | null>;
    save(entity: C): Promise<E>;
    update(id: number, entity: U): Promise<E>;
    delete(id: number): Promise<void | null>;
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