import fs from 'node:fs/promises';
import {
  IPersistenceInFileSystemAsync,
  ITask,
} from '../../../../domain/interfaces';
import { ConflitError } from '../../../../domain/exceptions';

export class TaskTrackerInFileSystem
  implements IPersistenceInFileSystemAsync<ITask>
{
  private readonly filePath: string;

  constructor(filePath: string) {
    if (!filePath.endsWith('.json')) {
      throw new Error('File path must be a .json file');
    } else if (!filePath.startsWith('/')) {
      throw new Error('File path must be an absolute path');
    }
    this.filePath = filePath;
  }

  async read(): Promise<ITask[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new ConflitError('Error read file');
    }
  }

  async write(data: ITask[]): Promise<void> {
    try {
      const taskObjectToString = JSON.stringify(data);
      await fs.writeFile(this.filePath, taskObjectToString, 'utf-8');
    } catch (error) {
      throw new ConflitError('Error write file');
    }
  }
}
