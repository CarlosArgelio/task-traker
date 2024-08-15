import fs from 'node:fs/promises';
import { ICreateTask, IPersistenceInFileSystemAsync, ITask, TaskStatus } from "../../../../domain/interfaces";

export class TaskTrackerInFileSystem implements IPersistenceInFileSystemAsync<ITask> {
    private readonly filePath: string
    
    constructor(filePath: string) {
        if (!filePath.endsWith(".json")) {
            throw new Error("File path must be a .json file");
        } else if (!filePath.startsWith("/")) {
            throw new Error("File path must be an absolute path");
        }
        this.filePath = filePath
    }
    
    async read(): Promise<ITask[]> {
        const data = await fs.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    async write(data: ITask[]): Promise<void> {
        const taskObjectToString = JSON.stringify(data)
        await fs.writeFile(this.filePath, taskObjectToString, 'utf-8');
    }
}