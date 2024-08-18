import { TaskTrackerService } from '../../domain/services/taskTrackerService/taskTrackerService';
import { FileSystemTaskTrackerDAO } from '../../infraestructure/dao';
import { TaskTrackerRepositoryAsync } from '../../infraestructure/repositories/inFIleSystem';
import { TaskTrackerInFileSystem } from '../../infraestructure/persistence';
import { CreateTaskCLI } from './CreateTask';
import { FindTaskCLI } from './FindTask';
import { UpdateDescriptionTaskCLI } from './UpdateDescriptionTask';
import {
  TaskTrackerCreatorUseCase,
  TaskTrackerDeleterUseCase,
  TaskTrackerFinderUseCase,
  TaskTrackerUpdatorUseCase,
} from '../../application/useCases';
import { TaskStatus } from '../../domain/interfaces';
import { DeleteTaskCLI } from './DeleteTask';

export class TaskTrackerCLI {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
  }

  async gettingStarted() {
    const args = process.argv.slice(2);

    const file = this.path;
    const service = new TaskTrackerService(
      new TaskTrackerRepositoryAsync(
        new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem(file)),
      ),
    );

    try {
      switch (args[0]) {
        case 'add':
          await new CreateTaskCLI(
            new TaskTrackerCreatorUseCase(service),
          ).createTask(args[1]);
          break;

        case 'list':
          await new FindTaskCLI(new TaskTrackerFinderUseCase(service)).findTask(
            args[1],
          );
          break;

        case 'update':
          await new UpdateDescriptionTaskCLI(
            new TaskTrackerUpdatorUseCase(service),
          ).updateTask(+args[1], args[2]);
          break;

        case 'delete':
          await new DeleteTaskCLI(
            new TaskTrackerDeleterUseCase(service),
          ).deleteTask(+args[1]);
          break;

        case 'mark-in-progress':
          await new UpdateDescriptionTaskCLI(
            new TaskTrackerUpdatorUseCase(service),
          ).updateTask(+args[1], undefined, TaskStatus.IN_PROGRESS);
          break;

        case 'mark-done':
          await new UpdateDescriptionTaskCLI(
            new TaskTrackerUpdatorUseCase(service),
          ).updateTask(+args[1], undefined, TaskStatus.DONE);
          break;

        default:
          console.log('Invalid command. Please try again.');
      }
    } catch (error) {
      throw error;
    }
  }
}
