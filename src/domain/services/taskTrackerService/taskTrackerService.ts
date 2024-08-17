import { IsNotValidTypeError, ConflitError } from '../../exceptions';
import { ICreateTask, IUpdateTask, TaskStatus } from '../../interfaces';
import { ITaskTrackerRepositoryAsync } from '../../repositories';
import { Description, ID, Status } from '../../valueObject';

export class TaskTrackerService {
  private readonly repository: ITaskTrackerRepositoryAsync;

  constructor(repository: ITaskTrackerRepositoryAsync) {
    this.repository = repository;
  }

  async findAll(filter: string | undefined) {
    try {
      if (filter !== undefined) new Status(filter as TaskStatus);
      return await this.repository.findAll(filter);
    } catch (error) {
      throw error;
    }
  }

  async create(data: ICreateTask) {
    try {
      new Description(data.description);
      return await this.repository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: IUpdateTask) {
    try {
      new ID(id);

      if (data.description !== undefined) new Description(data.description);
      if (data.status !== undefined) new Status(data.status);

      return await this.repository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number) {
    try {
      new ID(id);

      return await this.repository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
