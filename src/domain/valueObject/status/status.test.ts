import { TaskStatus } from '../../interfaces';
import { Status } from './status';

describe('Status Value Object', () => {
  test('should void to insert a valid Status "done"', () => {
    const status = TaskStatus.DONE;
    const statusValueObject = new Status(status);
    expect(statusValueObject.status).toBe(status);
  });

  test('should void to insert a valid Status "todo"', () => {
    const status = TaskStatus.TODO;
    const statusValueObject = new Status(status);
    expect(statusValueObject.status).toBe(status);
  });

  test('should void to insert a valid Status "in-progress"', () => {
    const status = TaskStatus.IN_PROGRESS;
    const statusValueObject = new Status(status);
    expect(statusValueObject.status).toBe(status);
  });

  test('should throw an error to insert an invalid Status', () => {
    const status = 'invalid-status';
    expect(() => new Status(status as TaskStatus)).toThrow(
      'Status only must be todo, in-progress, done',
    );
  });
});
