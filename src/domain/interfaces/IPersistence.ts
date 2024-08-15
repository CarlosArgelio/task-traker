export interface IPersistenceInFileSystemAsync<E, Created> {
    read(): Promise<E[]>
    write(data: Created): Promise<E>
}