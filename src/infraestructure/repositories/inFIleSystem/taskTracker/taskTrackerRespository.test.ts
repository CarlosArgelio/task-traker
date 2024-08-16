import { ITask, TaskStatus } from "../../../../domain/interfaces";
import { FileSystemTaskTrackerDAO } from "../../../dao"
import { TaskTrackerInFileSystem } from "../../../persistence"
import { TaskTrackerRepositoryAsync } from "./taskTrackerRespository"

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

describe('TaskTrackerRepositoryAsync', () => {
    let filePath: string;
    let jsonData: ITask[];
    let repositorie: TaskTrackerRepositoryAsync

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
            }
        ];

        const tmpDir = os.tmpdir();
        const fileName = `temp-file-${Date.now()}.json`;
        filePath = path.join(tmpDir, fileName);
        const jsonString = JSON.stringify(jsonData, null, 2);
        fs.writeFile(filePath, jsonString, 'utf-8');

        repositorie = new TaskTrackerRepositoryAsync(new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem(filePath)))
    })
    
    describe('save method', () => {
        test('should save a task', () => {
            
        })
    })
    describe('findAll method', () => {
        test('should return all tasks', async () => {
            const findAll = await repositorie.findAll();

            const jsonDataWithStringDates = jsonData.map(task => ({
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt ? task.updatedAt?.toISOString() : undefined,
              }));

            expect(findAll).toEqual(jsonDataWithStringDates);
        })
    })
})