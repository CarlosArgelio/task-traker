/**
 * Status:
 * todo, in-progress, done
 */

import { TaskStatus } from '../../interfaces';

export class Status {
  public status: TaskStatus;

  constructor(status: TaskStatus) {
    this.status = status;
    this.validate();
  }

  isValidStatus(): boolean {
    return Object.values(TaskStatus).includes(this.status);
  }

  validate() {
    if (!this.isValidStatus()) {
      throw new Error('Invalid status');
    }

    return true;
  }
}
