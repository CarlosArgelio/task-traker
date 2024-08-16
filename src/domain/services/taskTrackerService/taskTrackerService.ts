import { ICreateTask, IUpdateTask } from '../../interfaces';
import { ITaskTrackerRepositoryAsync } from '../../repositories';

export class TaskTrackerService {
  private readonly repository: ITaskTrackerRepositoryAsync;

  constructor(repository: ITaskTrackerRepositoryAsync) {
    this.repository = repository;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async create(data: ICreateTask) {
    return await this.repository.save(data);
  }

  async update(id: number, data: IUpdateTask) {
    return await this.repository.update(id, data);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
