import { ICreateTask, ITask, IUpdateTask } from "../../../../domain/interfaces";
import { ITaskTrackerDAOAsync } from "../../../../domain/repositories/taskTracker/tastTracker";
import { TaskTrackerInFileSystem } from "./../../../persistence";
import path from "node:path";

export class FileSystemTaskTrackerDAO implements ITaskTrackerDAOAsync {
    private fileSystem: TaskTrackerInFileSystem

    constructor(fileSystem: TaskTrackerInFileSystem)  {
        this.fileSystem = fileSystem        
    }

    async findAll(): Promise<ITask[] | null> {
        return await this.fileSystem.read()
    }
    findByAttribute(id: number): Promise<ITask | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: ICreateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    update(id: number, entity: IUpdateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
}