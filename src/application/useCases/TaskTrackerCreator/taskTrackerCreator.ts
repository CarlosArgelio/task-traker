import { ConflitError, IsNotValidTypeError } from '../../../domain/exceptions';
import { ICreateTask } from '../../../domain/interfaces';
import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';

export class TaskTrackerCreatorUseCase {
  private readonly service: TaskTrackerService;

  constructor(service: TaskTrackerService) {
    this.service = service;
  }

  async run(data: ICreateTask) {
    try {
      const service = await this.service.create(data);
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
