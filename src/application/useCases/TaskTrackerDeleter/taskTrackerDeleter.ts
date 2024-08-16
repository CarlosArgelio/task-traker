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
      // @ts-ignore
      throw new Error(error);
    }
  }
}
