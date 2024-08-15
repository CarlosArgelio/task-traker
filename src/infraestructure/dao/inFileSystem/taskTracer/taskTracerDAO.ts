import { ICreateTask, ITask, IUpdateTask, TaskStatus } from "../../../../domain/interfaces";
import { ITaskTrackerDAOAsync } from "../../../../domain/repositories/taskTracker/tastTracker";
import { TaskTrackerInFileSystem } from "./../../../persistence";

export class FileSystemTaskTrackerDAO implements ITaskTrackerDAOAsync {
    private fileSystem: TaskTrackerInFileSystem

    constructor(fileSystem: TaskTrackerInFileSystem)  {
        this.fileSystem = fileSystem        
    }

    async findAll(): Promise<ITask[]> {
        const tasks = await this.fileSystem.read()
        if (!tasks) throw new Error("Tasks not found");

        return tasks
    }

    findById(): Promise<ITask | null> {
        throw new Error("Method not implemented.");
    } 

    async create(entity: ICreateTask): Promise<ITask> {
        // get all ids
        const findAll = await this.findAll()

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
        const findTask = findAllWithNewObject.find(task => task.id === newId)
        if (!findTask) throw new Error("Task not found");

        return findTask
    }
    async update(id: number, entity: IUpdateTask): Promise<ITask> {
        const findAll = await this.findAll()

        // find index
        const index = findAll.findIndex(task => task.id === id)
        if (index === -1) throw new Error("Task not found");

        // update data in memory
        const updateTask = { ...findAll[index], ...entity };
        findAll[index] = updateTask;

        // write 
        await this.fileSystem.write(findAll)

        // find new object task
        const findAllWithNewObject = await this.findAll()
        const findTask = findAllWithNewObject.find(task => task.id === id)
        if (!findTask) throw new Error("Task not found");

        return findTask
    }
    
    delete(id: number): Promise<void | null> {
        throw new Error("Method not implemented.");
    }
}