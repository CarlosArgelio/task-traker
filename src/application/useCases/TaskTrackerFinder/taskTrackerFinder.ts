import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';

export class TaskTrackerFinderUseCase {
  private readonly service: TaskTrackerService;

  constructor(service: TaskTrackerService) {
    this.service = service;
  }

  async run() {
    try {
      const service = await this.service.findAll();
      return service;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }
}
