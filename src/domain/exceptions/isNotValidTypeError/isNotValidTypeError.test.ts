import { IsNotValidTypeError } from './isNotValidTypeError';

describe('IsNotValidTypeError', () => {
  test('should thorw valid error', () => {
    const error = new IsNotValidTypeError('value', true);

    expect(error.message).toBe('value');
    expect(error.isOperational).toBeTruthy();
    expect(error.name).toBe('IsNotValidTypeError');
  });
});
