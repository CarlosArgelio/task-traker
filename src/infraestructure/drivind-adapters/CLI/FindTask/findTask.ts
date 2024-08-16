import { TaskTrackerFinderUseCase } from "../../../../application/useCases";

export class FindTaskCLI {
    private readonly useCase: TaskTrackerFinderUseCase

    constructor(useCase: TaskTrackerFinderUseCase) {
        this.useCase = useCase
    }

    async findTask() {
        try {
            const newTask = await this.useCase.run()
            newTask.forEach(task => {
                console.log(`ID: ${task.id}, Description: ${task.description}, status: ${task.status}`);
            });
        } catch (error) {
            throw new Error(`Error creating task: ${error}`)
        }
    }
}