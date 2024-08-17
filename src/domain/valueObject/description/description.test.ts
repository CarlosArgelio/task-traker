import { Description } from './description';

describe('Description Value Object', () => {
  test('should void to valida Description', () => {
    const description = 'description';
    const descriptionValueObject = new Description(description);

    expect(descriptionValueObject.description).toBe('description');
    expect(descriptionValueObject.validate());
  });

  test('should throw when description is not string', () => {
    const description = 1;

    // @ts-ignore
    expect(() => new Description(description)).toThrow(
      'Description must be a string',
    );
  });

  test('should throw when description is empty', () => {
    const description = '';

    // @ts-ignore
    expect(() => new Description(description)).toThrow(
      'Description cannot be empty',
    );
  });
});
