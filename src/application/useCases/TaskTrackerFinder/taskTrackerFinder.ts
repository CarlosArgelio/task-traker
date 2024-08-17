import { ConflitError, IsNotValidTypeError } from '../../../domain/exceptions';
import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';

export class TaskTrackerFinderUseCase {
  private readonly service: TaskTrackerService;

  constructor(service: TaskTrackerService) {
    this.service = service;
  }

  async run(filter: string) {
    try {
      const service = await this.service.findAll(filter);
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
