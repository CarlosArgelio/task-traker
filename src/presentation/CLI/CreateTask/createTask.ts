import { TaskTrackerCreatorUseCase } from '../../../application/useCases';

export class CreateTaskCLI {
  private readonly useCase: TaskTrackerCreatorUseCase;

  constructor(useCase: TaskTrackerCreatorUseCase) {
    this.useCase = useCase;
  }

  async createTask(description: string) {
    try {
      const newTask = await this.useCase.run({ description });
      console.log(`Task added successfully (ID: ${newTask.id})`);
    } catch (error) {
      throw error;
    }
  }
}
