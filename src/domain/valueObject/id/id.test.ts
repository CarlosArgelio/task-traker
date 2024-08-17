import { ID } from './id';

describe('ID Value Object', () => {
  test('should void to valida ID', () => {
    const number = 1;
    const id = new ID(number);

    expect(id.id).toBe(1);
  });

  test('shoud throw when id is not number', () => {
    const number = '1';
    // @ts-ignore
    expect(() => new ID(number)).toThrow('ID must be an integer');
  });

  test('shoud throw when id is < 0', () => {
    const number = -1;
    // @ts-ignore
    expect(() => new ID(number)).toThrow('ID cannot be negative');
  });

  test('shoud throw when id is equal 0', () => {
    const number = 0;
    // @ts-ignore
    expect(() => new ID(number)).toThrow('ID cannot be zero');
  });

  test('shoud throw when id is empty', () => {
    const number = undefined;
    // @ts-ignore
    expect(() => new ID(number)).toThrow('ID cannot be empty');
  });
});
