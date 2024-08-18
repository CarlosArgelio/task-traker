import { TaskTrackerUpdatorUseCase } from '../../../application/useCases';
import { IUpdateTask, TaskStatus } from '../../../domain/interfaces';

export class UpdateDescriptionTaskCLI {
  private readonly useCase: TaskTrackerUpdatorUseCase;

  constructor(useCase: TaskTrackerUpdatorUseCase) {
    this.useCase = useCase;
  }

  async updateTask(id: number, description?: string, status?: TaskStatus) {
    try {
      if (description !== undefined)
        await this.useCase.run(id, description, undefined);
      if (status !== undefined) await this.useCase.run(id, undefined, status);
    } catch (error) {
      throw error;
    }
  }
}
