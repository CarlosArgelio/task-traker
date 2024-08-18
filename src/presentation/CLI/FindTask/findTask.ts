import { table } from 'console';
import { TaskTrackerFinderUseCase } from '../../../application/useCases';

export class FindTaskCLI {
  private readonly useCase: TaskTrackerFinderUseCase;

  constructor(useCase: TaskTrackerFinderUseCase) {
    this.useCase = useCase;
  }

  async findTask(filter: string) {
    try {
      const newTask = await this.useCase.run(filter);
      const mapping = newTask.map((task) => [
        task.id,
        task.description,
        task.status,
      ]);
      table(mapping);
    } catch (error) {
      throw error;
    }
  }
}
