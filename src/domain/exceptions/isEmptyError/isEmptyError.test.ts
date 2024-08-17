import { IsEmptyError } from './isEmptyError';

describe('IsNotEmptyError', () => {
  test('should thorw valid error', () => {
    const error = new IsEmptyError('value', true);

    expect(error.message).toBe('value');
    expect(error.isOperational).toBeTruthy();
    expect(error.name).toBe('IsEmptyError');
  });
});
