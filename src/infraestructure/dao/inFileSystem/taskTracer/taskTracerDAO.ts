import { NotFoundError } from '../../../../domain/exceptions/notFoundError/notFoundError';
import {
  ICreateTask,
  ITask,
  IUpdateTask,
  TaskStatus,
} from '../../../../domain/interfaces';
import { ITaskTrackerDAOAsync } from '../../../../domain/repositories/taskTracker/tastTracker';
import { TaskTrackerInFileSystem } from './../../../persistence';

export class FileSystemTaskTrackerDAO implements ITaskTrackerDAOAsync {
  private fileSystem: TaskTrackerInFileSystem;

  constructor(fileSystem: TaskTrackerInFileSystem) {
    this.fileSystem = fileSystem;
  }

  async findAll(): Promise<ITask[]> {
    const tasks = await this.fileSystem.read();
    if (!tasks) throw new NotFoundError('Tasks not found', true);

    return tasks;
  }

  async findById(id: number): Promise<ITask> {
    const task = await this.findAll();
    const findTask = task.find((task) => task.id === id);
    if (!findTask) throw new NotFoundError('Task not found', true);

    return findTask;
  }

  async create(entity: ICreateTask): Promise<ITask> {
    // get all ids
    const findAll = await this.findAll();

    // create new id
    const findAllIds = findAll.map((task) => task.id);
    // If not ids return 1
    const newId = findAllIds.length > 0 ? Math.max(...findAllIds) + 1 : 1;

    // create new object task
    const newTask: ITask = {
      id: newId,
      description: entity.description,
      status: TaskStatus.TODO,
      createdAt: new Date(),
      updatedAt: undefined,
    };

    // concat object task to array tasks
    const addNewObject = findAll.concat(newTask);
    await this.fileSystem.write(addNewObject);

    // find new object task
    const findTask = await this.findById(newId);
    return findTask;
  }
  async update(id: number, entity: IUpdateTask): Promise<ITask> {
    const findAll = await this.findAll();

    // find index
    const index = findAll.findIndex((task) => task.id === id);
    if (index === -1) throw new NotFoundError('Task not found', true);

    // update data in memory
    const updateTask = { ...findAll[index], ...entity };
    findAll[index] = updateTask;

    // write
    await this.fileSystem.write(findAll);

    // find new task
    const findTask = await this.findById(id);
    return findTask;
  }

  async delete(id: number): Promise<void> {
    const findAll = await this.findAll();
    const filter = findAll.filter((task) => task.id !== id);
    await this.fileSystem.write(filter);
  }
}
