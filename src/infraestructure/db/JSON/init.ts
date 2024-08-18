import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { ConflitError } from '../../../domain/exceptions';

export class InitDB {
  public pathDB!: string;

  async init() {
    try {
      this.setPath();
      await fs.access(this.pathDB);
    } catch (error) {
      if (error instanceof Error) {
        const fsError = error as NodeJS.ErrnoException;

        if (fsError.code === 'ENOENT') {
          // Directory not exits
          await fs.writeFile(this.pathDB, JSON.stringify([]), {
            encoding: 'utf8',
          });
        } else if (fsError.code === 'EACCES') {
          // Permission denied
          throw new ConflitError('Permission denied: initDB instance');
        } else if (fsError.code === 'ENOSPC') {
          // No space left on device
          throw new ConflitError('No space left on device: initDB instance');
        } else if (fsError.code === 'EMFILE') {
          // Too many open files
          throw new ConflitError('Too many open files: initDB instance');
        }
      } else if (error instanceof TypeError) {
        throw new ConflitError('TypeError: initDB instance');
      }

      this.setPath();
    }
  }

  getPath() {
    return path.resolve(__dirname, './db.json');
  }

  setPath() {
    this.pathDB = this.getPath();
  }
}
