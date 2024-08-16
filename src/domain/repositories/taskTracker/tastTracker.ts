import { ICreateTask, ITask, IUpdateTask } from '../../interfaces';
import { IDAOAsync, IRepositoryAsync } from '../../interfaces/IRepository';

export type ITaskTrackerRepositoryAsync = IRepositoryAsync<
  ITask,
  ICreateTask,
  IUpdateTask
>;

export type ITaskTrackerDAOAsync = IDAOAsync<ITask, ICreateTask, IUpdateTask>;
