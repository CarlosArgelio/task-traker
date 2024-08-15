import { ITask, ICreateTask, IUpdateTask } from "../../../../domain/interfaces";
import { ITaskTrackerRepositoryAsync } from "../../../../domain/repositories";

export class TaskTrackerRepositoryAsync implements ITaskTrackerRepositoryAsync {
    findAll(): Promise<ITask[] | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<ITask | null> {
        throw new Error("Method not implemented.");
    }
    save(entity: ICreateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    update(id: number, entity: IUpdateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
}