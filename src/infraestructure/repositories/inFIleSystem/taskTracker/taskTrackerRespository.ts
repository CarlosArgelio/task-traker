import { ITask, ICreateTask, IUpdateTask } from '../../../../domain/interfaces';
import { ITaskTrackerRepositoryAsync } from '../../../../domain/repositories';
import { FileSystemTaskTrackerDAO } from '../../../dao';

export class TaskTrackerRepositoryAsync implements ITaskTrackerRepositoryAsync {
  private readonly taskDAO: FileSystemTaskTrackerDAO;

  constructor(taskDAO: FileSystemTaskTrackerDAO) {
    this.taskDAO = taskDAO;
  }

  async findAll(): Promise<ITask[]> {
    try {
      const tasks = await this.taskDAO.findAll();
      return tasks;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
  findById(id: number): Promise<ITask> {
    try {
      const task = this.taskDAO.findById(id);
      return task;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
  async save(entity: ICreateTask): Promise<ITask> {
    try {
      const task = await this.taskDAO.create(entity);
      return task;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
  async update(id: number, entity: IUpdateTask): Promise<ITask> {
    try {
      await this.findById(id);
      const update = await this.taskDAO.update(id, entity);
      return update;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await this.findById(id);
      await this.taskDAO.delete(id);
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
}
