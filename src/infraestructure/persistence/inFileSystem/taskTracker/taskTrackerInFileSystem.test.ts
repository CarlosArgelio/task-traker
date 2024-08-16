import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { ICreateTask, ITask, TaskStatus } from '../../../../domain/interfaces';
import { TaskTrackerInFileSystem } from './taskTrackerInFileSystem';

describe('TaskTrackerRepositoryAsync', () => {
  let filePath: string;
  let jsonData: ITask[];
  beforeEach(() => {
    jsonData = [
      {
        id: 1,
        description: 'Description 1',
        status: TaskStatus.DONE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        description: 'Description 1',
        status: TaskStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const tmpDir = os.tmpdir();
    const fileName = `temp-file-${Date.now()}.json`;
    filePath = path.join(tmpDir, fileName);
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filePath, jsonString, 'utf-8');
  });

  describe('read method', () => {
    test('should return an array of tasks', async () => {
      const taskTrackerInFileSystem = new TaskTrackerInFileSystem(filePath);

      const tasks = await taskTrackerInFileSystem.read();
      const jsonDataWithStringDates = jsonData.map((task) => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt ? task.updatedAt?.toISOString() : undefined,
      }));

      expect(tasks).toEqual(jsonDataWithStringDates);
    });
  });
  describe('write method', () => {
    test('should return data created', async () => {
      const taskTrackerInFileSystem = new TaskTrackerInFileSystem(filePath);

      const allTask = await taskTrackerInFileSystem.read();
      const newTask: ITask = {
        id: 3,
        description: 'description',
        status: TaskStatus.TODO,
        createdAt: new Date(),
        updatedAt: undefined,
      };

      const addNewObject = allTask.concat(newTask);
      await taskTrackerInFileSystem.write(addNewObject);

      const allTaskAfterAdd = await taskTrackerInFileSystem.read();

      expect(allTaskAfterAdd.length).toBe(jsonData.length + 1);
    });
  });
});
