import { TaskTrackerDeleterUseCase } from '../../../application/useCases';

export class DeleteTaskCLI {
  private readonly useCase: TaskTrackerDeleterUseCase;

  constructor(useCase: TaskTrackerDeleterUseCase) {
    this.useCase = useCase;
  }

  async deleteTask(id: number) {
    try {
      await this.useCase.run(id);
    } catch (error) {
      throw error;
    }
  }
}
