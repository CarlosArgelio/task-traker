import { ConflitError, IsNotValidTypeError } from '../../../domain/exceptions';
import { IUpdateTask, TaskStatus } from '../../../domain/interfaces';
import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';

export class TaskTrackerUpdatorUseCase {
  private readonly service: TaskTrackerService;

  constructor(service: TaskTrackerService) {
    this.service = service;
  }

  async run(id: number, description?: string, status?: TaskStatus) {
    try {
      let changes: IUpdateTask = {};
      if (description !== undefined) changes.description = description;
      if (status !== undefined) changes.status = status;

      const service = await this.service.update(id, changes);
      return service;
    } catch (error) {
      if (error instanceof IsNotValidTypeError) {
        throw error;
      } else {
        console.log(error);
        throw new ConflitError('Unknown error');
      }
    }
  }
}
