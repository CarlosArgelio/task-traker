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
      // @ts-ignore
      throw new Error(error);
    }
  }
}
