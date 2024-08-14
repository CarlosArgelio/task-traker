export class TaskTrackerCLI {
    constructor() {
        console.log("Hello, this is your CLI!");
        this.gettingStarted();
    }

    gettingStarted() {
        const args = process.argv.slice(2);
        console.log("🚀 ~ TaskTrackerCLI ~ gettingStarted ~ args:", args)
        
        switch (args[0]) {
            case 'add':
                console.log('Creating a new task...');
                break;
            case 'list':
                console.log('linting a new task...');
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