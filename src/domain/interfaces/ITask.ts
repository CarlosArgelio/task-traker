export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface ITask {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date | undefined;
}

export type ICreateTask = Pick<ITask, 'description'>;
export type IUpdateTask = Partial<Pick<ITask, 'description' | 'status'>>;
