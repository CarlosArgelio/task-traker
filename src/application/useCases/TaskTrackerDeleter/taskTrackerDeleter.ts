import { ConflitError, IsNotValidTypeError } from '../../../domain/exceptions';
import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';

export class TaskTrackerDeleterUseCase {
  private readonly service: TaskTrackerService;

  constructor(service: TaskTrackerService) {
    this.service = service;
  }

  async run(id: number) {
    try {
      const service = await this.service.delete(id);
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
