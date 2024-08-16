import path from 'node:path';
import { TaskTrackerService } from '../../../domain/services/taskTrackerService/taskTrackerService';
import { FileSystemTaskTrackerDAO } from '../../dao';
import { TaskTrackerRepositoryAsync } from '../../repositories/inFIleSystem';
import { TaskTrackerInFileSystem } from '../../persistence';
import { CreateTaskCLI } from './CreateTask';
import { FindTaskCLI } from './FindTask';
import { UpdateDescriptionTaskCLI } from './UpdateDescriptionTask';
import {
  TaskTrackerCreatorUseCase,
  TaskTrackerDeleterUseCase,
  TaskTrackerFinderUseCase,
  TaskTrackerUpdatorUseCase,
} from '../../../application/useCases';
import { TaskStatus } from '../../../domain/interfaces';
import { DeleteTaskCLI } from './DeleteTask';

export class TaskTrackerCLI {
  constructor() {
    console.log('Hello, this is your CLI!');
    this.gettingStarted();
  }

  async gettingStarted() {
    const args = process.argv.slice(2);

    const file = path.resolve(__dirname, './../../db/JSON/db.json');
    const service = new TaskTrackerService(
      new TaskTrackerRepositoryAsync(
        new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem(file)),
      ),
    );

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
  }
}
