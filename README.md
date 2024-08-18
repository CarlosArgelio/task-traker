# TaskTrackerCLI

TaskTrackerCLI is a command-line tool for managing tasks, written in TypeScript. It allows users to easily create, list, update, and delete tasks.

## Installation

To use TaskTrackerCLI, first, clone the repository and then install the necessary dependencies. After that, you can use the npm link command to make the task-cli command available globally on your system.

```cli
git clone https://github.com/your-username/task-tracker-cli.git
cd task-tracker-cli
npm install
npm link
```

## Usage

### List all tasks

To list all tasks, you can use the following command. If the database does not exist, it will be created automatically.

```
task-cli list
```
This command will return all stored tasks. If you want to filter the tasks by status, you can use one of the following optional filters: done, todo, in-progress.

```
task-cli list {filter}
```

#### Example:

- To list all pending tasks (todo):
```
task-cli list todo
```

- To list all tasks in progress (in-progress):
```
task-cli list in-progress
```

- To list all completed tasks (done):
```
task-cli list done
```

### Create a task
To create a new task, use the add command followed by the task description in quotes.

```
task-cli add "Task description"
```

### Update a task
To update the description of an existing task, use the update command followed by the task ID and the new description.

```
task-cli update "ID" "New task description"
```
### Update task status
To change the status of a task to "in progress," use the following command:

```
task-cli mark-in-progress "ID"
```

To mark a task as completed, use:
```
task-cli mark-done "ID"
```

### Delete a task
To delete a task, use the following command with the task ID:

```
task-cli delete "ID"
```

## Contributions
If you would like to contribute to TaskTrackerCLI, please fork the repository, create a branch for your feature or bug fix, and then submit a pull request.

# Project URL: https://roadmap.sh/projects/task-tracker
**
