import { ITask, ICreateTask, IUpdateTask } from "../../../../domain/interfaces";
import { ITaskTrackerRepositoryAsync } from "../../../../domain/repositories";
import { FileSystemTaskTrackerDAO } from "../../../dao";

export class TaskTrackerRepositoryAsync implements ITaskTrackerRepositoryAsync {
    private readonly taskDAO: FileSystemTaskTrackerDAO

    constructor(taskDAO: FileSystemTaskTrackerDAO) {
        this.taskDAO = taskDAO
    }
    
    async findAll(): Promise<ITask[]> {
        try {
            const tasks = await this.taskDAO.findAll()
            return tasks
        } catch (error) {
            // @ts-ignore
            throw new Error(error)
        }
    }
    findById(id: number): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    save(entity: ICreateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    update(id: number, entity: IUpdateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}