import { NotFoundError } from './notFoundError';

describe('IsNotEmptyError', () => {
  test('should thorw valid error', () => {
    const error = new NotFoundError('value', true);

    expect(error.message).toBe('value');
    expect(error.isOperational).toBeTruthy();
    expect(error.name).toBe('NotFoundError');
  });
});
