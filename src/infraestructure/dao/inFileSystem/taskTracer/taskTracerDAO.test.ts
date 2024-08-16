import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  ICreateTask,
  ITask,
  IUpdateTask,
  TaskStatus,
} from '../../../../domain/interfaces';
import { TaskTrackerInFileSystem } from '../../../persistence';
import { FileSystemTaskTrackerDAO } from './taskTracerDAO';

describe('FileSystemTaskTrackerDAO', () => {
  let filePath: string;
  let jsonData: ITask[];
  let dao: FileSystemTaskTrackerDAO;

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

    dao = new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem(filePath));
  });

  describe('findAll Method', () => {
    test('should return all tasks', async () => {
      const tasks = await dao.findAll();

      const jsonDataWithStringDates = jsonData.map((task) => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt ? task.updatedAt?.toISOString() : undefined,
      }));

      expect(tasks).toEqual(jsonDataWithStringDates);
    });
  });

  describe('findById Method', () => {
    test('should return a task by id', async () => {
      const id = jsonData[0].id;
      const task = await dao.findById(id);

      const jsonDataWithStringDates = jsonData.map((task) => ({
        ...task,
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt ? task.updatedAt?.toISOString() : undefined,
      }));

      expect(task).toEqual(jsonDataWithStringDates[0]);
    });
  });

  describe('create Method', () => {
    test('should create a new task', async () => {
      const newTask: ICreateTask = { description: 'New Task' };

      const createTask = await dao.create(newTask);

      expect(createTask.description).toBe(newTask.description);
      expect(createTask.description).toBe(newTask.description);
      expect(createTask.id).toBe(jsonData.length + 1);
      expect(createTask.createdAt).toBeDefined();
      expect(createTask.updatedAt).toBeUndefined();
    });
  });

  describe('update Method', () => {
    test('should update a task', async () => {
      const dataToManipulate = jsonData[0];
      const id = dataToManipulate.id;
      const updateData: IUpdateTask = { description: 'description update' };

      const update = await dao.update(id, updateData);

      expect(update.description).toBe(updateData.description);
      expect(update.updatedAt).toBeDefined();
    });
  });

  describe('delete Method', () => {
    test('should delete a task', async () => {
      const dataToManipulate = jsonData[0];
      const id = dataToManipulate.id;

      await dao.delete(id);

      const findAll = await dao.findAll();
      expect(findAll.length).toBe(jsonData.length - 1);
    });
  });
});
