import { ConflitError } from './conflict';

describe('conflict error', () => {
  test('should return correct conflict error', () => {
    const conflict = new ConflitError('conflict');

    expect(conflict.isOperational).toBeFalsy();
    expect(conflict.name).toBe('ConflitError');
    expect(conflict.message).toBe('conflict');
  });
});
