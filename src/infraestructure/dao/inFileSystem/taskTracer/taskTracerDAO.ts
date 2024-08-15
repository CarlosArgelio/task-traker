import { ICreateTask, ITask, IUpdateTask, TaskStatus } from "../../../../domain/interfaces";
import { ITaskTrackerDAOAsync } from "../../../../domain/repositories/taskTracker/tastTracker";
import { TaskTrackerInFileSystem } from "./../../../persistence";

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
    async create(entity: ICreateTask): Promise<ITask> {
        // get all ids
        const findAll = await this.findAll()
        if (!findAll) throw new Error("Task not found");

        // create new id
        const findAllIds = findAll.map(task => task.id);
        const newId = Math.max(...findAllIds) + 1
        
        // create new object task
        const newTask: ITask = {
            id: newId,
            description: entity.description,
            status: TaskStatus.TODO,
            createdAt: new Date(),
            updatedAt: undefined
        }

        // concat object task to array tasks
        const addNewObject = findAll.concat(newTask)
        await this.fileSystem.write(addNewObject)
        
        // find new object task
        const findAllWithNewObject = await this.findAll()
        if (!findAllWithNewObject) throw new Error("Task not found");
        const find = findAllWithNewObject?.find(task => task.id === newId)
        if (!find) throw new Error("Task not found");

        return find
    }
    update(id: number, entity: IUpdateTask): Promise<ITask> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
}