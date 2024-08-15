import fs from 'node:fs/promises';
import { ICreateTask, IPersistenceInFileSystemAsync, ITask, TaskStatus } from "../../../../domain/interfaces";

export class TaskTrackerInFileSystem implements IPersistenceInFileSystemAsync<ITask, ICreateTask> {
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

    async write(data: ICreateTask): Promise<ITask> {
        const findAllIds = (await this.read()).map(task => task.id);
        const newId = Math.max(...findAllIds) + 1
        
        const newTask: ITask = {
            id: newId,
            description: data.description,
            status: TaskStatus.TODO,
            createdAt: new Date(),
            updatedAt: undefined
        }

        const addNewObject = (await this.read()).concat(newTask)
        const taskObjectToString = JSON.stringify(addNewObject)
        await fs.writeFile(this.filePath, taskObjectToString, 'utf-8');

        const findAllTask = (await this.read())
        const findTaskCreated = findAllTask.find(task => task.id === newId)

        if (!findTaskCreated) throw new Error("Task not found");
        
        return findTaskCreated
    }
}