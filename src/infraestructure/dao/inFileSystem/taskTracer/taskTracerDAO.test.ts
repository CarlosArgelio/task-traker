        // this.filePath = path.resolve(__dirname, './../../../db/db.json');
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { ITask, TaskStatus } from "../../../../domain/interfaces";
import { TaskTrackerInFileSystem } from "../../../persistence";
import { FileSystemTaskTrackerDAO } from "./taskTracerDAO";

describe('FileSystemTaskTrackerDAO', () => {
    let filePath: string;
    let jsonData: ITask[];
    let dao: FileSystemTaskTrackerDAO

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

        dao = new FileSystemTaskTrackerDAO(new TaskTrackerInFileSystem(filePath));
    })

    describe('findAll Method', () => {


        test('should return all tasks', async () => {
            const tasks = await dao.findAll();

            const jsonDataWithStringDates = jsonData.map(task => ({
                ...task,
                createdAt: task.createdAt.toISOString(),
                updatedAt: task.updatedAt ? task.updatedAt?.toISOString() : undefined,
              }));

            expect(tasks).toEqual(jsonDataWithStringDates);
        })
    })
    
    // describe('findByAttribute Method', () => {})
    // describe('create Method', () => {})
    // describe('update Method', () => {})
    // describe('create Method', () => {})

})