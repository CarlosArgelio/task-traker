import path from "node:path";
import { TaskTrackerService } from "../../../domain/services/taskTrackerService/taskTrackerService";
import { FileSystemTaskTrackerDAO } from "../../dao";
import { TaskTrackerRepositoryAsync } from "../../repositories/inFIleSystem";
import { TaskTrackerInFileSystem } from "../../persistence";
import { CreateTaskCLI } from "./CreateTask";
import { FindTaskCLI } from "./FindTask";
import { TaskTrackerCreatorUseCase, TaskTrackerFinderUseCase } from "../../../application/useCases";

export class TaskTrackerCLI {
    constructor() {
        console.log("Hello, this is your CLI!");
        this.gettingStarted();
    }

    async gettingStarted() {
        const args = process.argv.slice(2);

        const file = path.resolve(__dirname, './../../db/JSON/db.json')
        const service = new TaskTrackerService(new TaskTrackerRepositoryAsync(new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem( file ))))
        
        switch (args[0]) {
            case 'add':
                await new CreateTaskCLI(new TaskTrackerCreatorUseCase(service)).createTask(args[1])
                break;
            case 'list':
                await new FindTaskCLI(new TaskTrackerFinderUseCase(service)).findTask()
                break;
            case 'update':
                console.log('Updating all tasks...');
                break;
            case 'delete':
                console.log('Deleting a task...');
                break;
            case 'mark-in-progress':
                console.log('Marking-in-progress a task...');
                break;
            case 'mark-done':
                console.log('Marking-in-done a task...');
                break;
            default:
                console.log('Invalid command. Please try again.');
        }
    }
}