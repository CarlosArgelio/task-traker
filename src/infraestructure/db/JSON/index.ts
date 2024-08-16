import fs from 'node:fs/promises';
import path from 'node:path';

export class InitDB {
  public pathDB!: string;

  async init() {
    try {
      this.pathDB = this.getPath();
      await fs.access(this.pathDB);
    } catch (error) {
      await fs.writeFile(this.pathDB, JSON.stringify([]), { encoding: 'utf8' });
      this.pathDB = this.getPath();
    }
  }

  getPath() {
    return path.resolve(__dirname, './db.json');
  }
}
