export interface IPersistenceInFileSystemAsync<E> {
  read(): Promise<E[]>;
  write(data: E[]): Promise<void>;
}
